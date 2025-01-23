import Lead from '../../models/leadsSchema.js'; 

const getAllLeads = async (req, res) => {
  try {
      // Fetch all leads from the database
      const leads = await Lead.find();

      //if no result found
      if (leads.length < 1) {
        console.log("not found!")
        return res.status(404).json('No lead found!');
      }

      res.status(200).json(leads);
  } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

export default getAllLeads;