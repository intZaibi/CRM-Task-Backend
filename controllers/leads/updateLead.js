import Lead from '../../models/leadsSchema.js'; 

const updateLead = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, email, phone, status } = req.body;

      // Validate required fields
      if (!name || !email || !status) {
          return res.status(400).json({ message: 'Name, email, and status are required.' });
      }

      // Find the lead by ID and update it
      const updatedLead = await Lead.findByIdAndUpdate(
          id,
          { name, email, phone, status },
          { new: true, runValidators: true }
      );

      if (!updatedLead) {
          return res.status(404).json({ message: 'Lead not found.' });
      }

      res.status(200).json(updatedLead);
  } catch (error) {
      // Handle errors
      console.error(error);
      if (error.kind === 'ObjectId') {
          return res.status(400).json({ message: 'Invalid lead ID.' });
      }
      res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

export default updateLead;
