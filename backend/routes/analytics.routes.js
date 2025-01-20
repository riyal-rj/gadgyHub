import express from 'express';
import { getAnalytics, getDailySalesData } from '../controllers/analytics.controller.js';
import { adminRoute, protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protectedRoute, adminRoute, async (req, res) => {
    try {
        const analyticsData = await getAnalytics();

       
        const endDate = new Date();
        const startDate=new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const dailySalesData = await getDailySalesData(startDate, endDate);

        res.json(
            {
                analyticsData,
                dailySalesData
            }
        );
    } catch (error) {
        console.log('Error in getAnalytics controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }


});
export default router;