import Lead from '../../models/leadsSchema.js'; 

const getLeadById = async (req, res) => {
  try {
      const { id } = req.params;

      // Find the lead by ID
      const lead = await Lead.findById(id);

      if (!lead) {
          return res.status(404).json({ message: 'Lead not found.' });
      }

      res.status(200).json(lead);
  } catch (error) {
      // Handle errors
      console.error(error);
      if (error.kind === 'ObjectId') {
          return res.status(400).json({ message: 'Invalid lead ID.' });
      }
      res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

export default getLeadById;
