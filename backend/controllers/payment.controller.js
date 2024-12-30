export const checkoutSession = async (req, res) => {
    try {
        const {listOfProducts,couponCode} = req.body;
        if(!listOfProducts) 
        {
            return res.status(404).json({
                status: "failed",
                message: "No products to checkout"
            });
        }

        

    } catch (error) {
        
    }
}