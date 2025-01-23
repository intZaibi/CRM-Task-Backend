import Lead from "../../models/leadsSchema.js";

const createLead = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    console.log(req.body)
    // Validate required fields
    if (!name || !email || !status) {
      return res
        .status(400)
        .json({ message: "Name, email, and status are required." });
    }

    // Create a new lead
    const newLead = new Lead({ name, email, phone, status });

    // Save the lead to the database
    const savedLead = await newLead.save();

    res.status(201).json(savedLead);
    
  } catch (error) {
    if (error.errorResponse.errmsg.includes("duplicate")) {
      console.error(error);
      return res.status(500).json({ message: "Duplicate Entry!!!" });
    }

    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export default createLead;
