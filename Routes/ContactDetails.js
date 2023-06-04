const express = require('express');
const router = express.Router();
const Contact = require('../models/ContactList');

router.post('/addContact', async (req, res) => {
  try {
    const { name, phone, email, useremail } = req.body;
    const contactData = { name, phone, email };

    const existingContact = await Contact.findOne({ email: useremail });

    if (existingContact) {
      // Check if the same contact details already exist
      const contactExists = existingContact.contacts.some((contact) => {
        return (
          contact.name === name &&
          contact.phone === phone &&
          contact.email === email
        );
      });

      if (!contactExists) {
        // Add the new contact to the existing user's document
        await Contact.findOneAndUpdate(
          { email: useremail },
          { $push: { contacts: contactData } }
        );
      }
    } else {
      // Create a new document for the user and add the contact
      console.log("Creating First Contact");

      await Contact.create({
        email: useremail,
        contacts: [contactData],
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: 'An error occurred while processing the Contact.' });
  }
});

router.post('/mycurrentData', async (req, res) => {
  try {
    const myData = await Contact.findOne({ email: req.body.email });
    console.log(myData);
    res.json(myData);
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: 'An error occurred while processing the Contact.' });
  }
});


router.post('/deleteData', async (req, res) => {
  try {
    const { email, contactId } = req.body;

    // Find the user's document
    const user = await Contact.findOne({ email });

    if (!user) {
      return res.json({ success: false, error: 'User not found.' });
    }

    // Filter out the contact to be deleted
    user.contacts = user.contacts.filter((contact) => contact._id.toString() !== contactId);

    // Save the updated user's document
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: 'An error occurred while deleting the contact.' });
  }
});

router.post('/updateData', async (req, res) => {
  try {
    const { email, contactId, name, phone } = req.body;

    // Find the user's document
    const user = await Contact.findOne({ email });

    if (!user) {
      return res.json({ success: false, error: 'User not found.' });
    }

    // Find the contact within the user's document
    const contact = user.contacts.find((contact) => contact._id.toString() === contactId);

    if (!contact) {
      return res.json({ success: false, error: 'Contact not found.' });
    }

    // Update the contact's name and phone
    contact.name = name;
    contact.phone = phone;

    // Save the updated user's document
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: 'An error occurred while updating the contact.' });
  }
});

module.exports = router;
