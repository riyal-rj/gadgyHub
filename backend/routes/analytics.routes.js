import express from 'express';
import { getAnalytics } from '../controllers/analytics.controller.js';
import { adminRoute, protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protectedRoute, adminRoute, async (req, res) => {
    try {
        const analyticsData = await getAnalytics();
        const endData = new Date();

        const dailySalesData = await getDailySalesData(startDate, endData);

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