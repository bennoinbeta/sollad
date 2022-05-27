import { Router } from 'express';

// Routes
import marketplaceRoutes from './nft/marketplace';

const router = Router();

router.use('/solana', marketplaceRoutes);

export default router;