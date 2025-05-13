# CRIMEWISE - Criminal Investigation System

![Lyra Chat]()

## Overview

CRIMEWISE is a comprehensive criminal investigation platform that combines powerful AI search capabilities with a robust crime database management system. The platform helps law enforcement agencies efficiently search criminal records, manage case information, and conduct investigations through separate modules for AI-powered searches and traditional database queries.

## Key Features

- **AI Search Module**: Dedicated AI search functionality powered by Gemini API
- **Crime Database**: Comprehensive MySQL database containing detailed criminal records
- **Admin Portal**: Secure interface for verified administrators to:
  - Enter and update criminal records
  - Manage case information
  - Add suspect profiles and victim details
  - Assign and track officers
- **PDF Report Generation**: Export detailed reports for investigations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- jsPDF for report generation
- React Router for navigation

### Backend
- MySQL database for storing criminal records
- REST API for data operations
- Authentication system for admin verification

### AI Integration
- Gemini API for advanced search capabilities

## System Requirements

- Node.js (v16 or higher)
- npm or yarn
- MySQL database
- Gemini API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crimewise.git
cd crimewise
```

2. Install dependencies:
```bash
npm install # or yarn install
```

3. Set up your database:
   - Create a new MySQL database
   - Import the provided SQL schema

4. Configure environment variables:
   Create a `.env` file in the root directory with the following:
```
VITE_GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_mysql_connection_string
```

5. Start the development server:
```bash
npm run dev # or yarn dev
```

## Project Structure

```
/src
  /AiSearch          # AI search components
  /components        # Reusable UI components
  /pages             # Application pages
  /constants         # Mock data and constants
  App.jsx            # Main application router
  main.jsx           # Application entry point
```

## Usage

1. **Home Page**: Overview of the system capabilities
2. **AI Search**: Access the AI-powered search functionality
3. **Crime Database**: Search criminal records using traditional database queries
4. **Admin Portal**: Secure area for authorized personnel to manage records (requires authentication)
5. **Case Details**: View comprehensive information about specific cases

## Admin Portal

The admin portal requires verification and allows authorized users to:
- Add new criminal records to the database
- Update existing case information
- Manage suspect and victim profiles
- Assign officers to cases

## Customization

- Modify `src/constants.js` to change default data
- Can also add your own mysql database in it
- Update Tailwind config for styling changes
- Adjust API endpoints in the respective components if using a different backend

## Deployment

For production deployment:
1. Build the application:
```bash
npm run build # or yarn build
```
2. Deploy the `dist` folder to your preferred hosting service

## Security

- All admin users must be verified before accessing the admin portal
- Authentication is required for adding or modifying database records
- Data transmission is encrypted for security

## Disclaimer

This application is for legitimate law enforcement and security purposes only. Ensure all usage complies with relevant privacy laws and regulations in your jurisdiction.

## License

MIT License

## THIS IS A MOCK APPLICATION NOT A REAL......ONE
