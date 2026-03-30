// ── MIDDLEWARE ──
app.use(cors());
app.use(express.json());
 
// ── ROUTES ──
app.use('/api/entries', entryRoutes);
 
// Health check
app.get('/', (req, res) => {
  res.json({ message: '📓 Cloud Journal API is running!' });
});
 
// ── DATABASE CONNECTION ──
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
 