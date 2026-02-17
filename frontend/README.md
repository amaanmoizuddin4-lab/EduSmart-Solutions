# EduSmart Frontend Setup Guide

## Prerequisites

- Node.js 16+ and npm/yarn
- Backend API running on `http://localhost:5000`

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

## Running the Application

```bash
# Development server
npm run dev

# Build for production
npm build

# Preview production build
npm run preview
```

Frontend will start on `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation component
│   └── ChatInterface.jsx   # AI chat interface
├── pages/
│   ├── LoginPage.jsx       # Login page
│   ├── RegisterPage.jsx    # Registration page
│   └── Dashboard.jsx       # Student dashboard
├── services/
│   └── apiService.js       # API client
├── context/
│   └── AuthContext.jsx     # Authentication context
├── App.jsx                 # Main app component
└── main.jsx               # Entry point
```

## Key Features

### 1. Authentication
- User registration with profile setup
- JWT-based authentication
- Protected routes
- Persistent login sessions

### 2. Chat Interface
- Real-time homework question submission
- Subject and topic selection
- AI-powered responses with explanation
- Feedback system (ratings and helpful buttons)
- Response time tracking

### 3. Dashboard
- Query statistics overview
- Performance metrics
- Subject distribution analysis
- Success target tracking

### 4. Learning Materials
- Personalized recommendations
- Material filtering by subject, difficulty, grade
- Usage tracking

## Configuration

### API Configuration
Update `src/services/apiService.js` if backend URL changes:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Tailwind CSS
Styles are configured via `tailwind.config.js`
Global styles in `src/index.css`

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in API requests
5. AuthContext manages authentication state

## API Integration

All API calls go through `apiService.js`:
```javascript
import { apiClient } from '../services/apiService';

// Example usage
const response = await apiClient.submitQuery({
  subject: 'Mathematics',
  topic: 'Quadratic Equations',
  question: 'How do I solve x^2 + 5x + 6 = 0?'
});
```

## Component Hierarchy

```
App
├── AuthProvider
├── Navbar
└── Routes
    ├── LoginPage
    ├── RegisterPage
    ├── Dashboard
    ├── ChatInterface
    └── Learning Materials
```

## State Management

- **AuthContext**: User authentication & profile
- **Local State**: UI states in individual components
- **API Responses**: Direct data handling

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Additional styles in `index.css`
- **Responsive**: Mobile-first design approach

## Performance Optimizations

- Code splitting with React Router
- Lazy loading of components
- Efficient re-renders with React Context
- Message virtualization in chat

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Production Build

```bash
npm run build
```

Output goes to `dist/` folder. Deploy this folder to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

## Environment Variables

Create `.env` file (if needed for API_BASE_URL):
```
VITE_API_URL=http://localhost:5000/api
```

Update in code:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

## Troubleshooting

- **Blank page**: Check browser console for errors
- **API not connecting**: Ensure backend is running on port 5000
- **Styling issues**: Clear node_modules and reinstall
- **Authentication failing**: Check token in localStorage

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Support

For issues, check:
1. Backend is running
2. API keys are configured
3. MongoDB is connected
4. Browser console for errors

## Next Steps

1. Install dependencies: `npm install`
2. Start backend: `cd ../backend && npm run dev`
3. Start frontend: `npm run dev`
4. Open http://localhost:3000 in browser
5. Register/Login and start using the platform!
