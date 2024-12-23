export const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err);
    
    res.status(err.status || 500).json({
      error: {
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      },
    });
  };
  
  export const notFoundHandler = (req, res) => {
    res.status(404).json({ error: { message: 'Route not found' } });
  };
  
  export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };