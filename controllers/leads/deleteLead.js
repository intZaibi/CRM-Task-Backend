import Lead from "../../models/leadsSchema.js";

const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedLead = await Lead.findByIdAndDelete(id);

        if (!deletedLead) {
            return res.status(404).json({ message: "Lead not found." });
        }

        res.status(200).json({ message: "Lead deleted successfully." });
    } catch (error) {
        console.error(error);
        if (error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid lead ID." });
        }
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export default deleteLead;
