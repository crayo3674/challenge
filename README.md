# Full Stack Next.js Developer Challenge

## Project Description
This project aims to create an onboarding process for landlords to manage their apartments and rooms efficiently. It utilizes Next.js for frontend development, Supabase for backend services including database management and storage, and Tailwind CSS for styling.

## Database Structure
The application integrates with Supabase to manage data. The database schema includes:

### Apartments Table
- **id** (UUID, Primary Key)
- **name** (String)
- **location** (String)
- **price** (Integer)
- **description** (Text)
- **createdAt** (Timestamp)

### Rooms Table
- **id** (UUID, Primary Key)
- **apartmentId** (UUID, Foreign Key references apartments.id)
- **name** (String)
- **size** (Integer, in square meters)
- **equipment** (Text)
- **imageUrl** (String)
- **createdAt** (Timestamp)

## Local Development Setup
To run this project locally, follow these steps:

1. **Clone the Repository:**
2. **Install Dependencies:**
3. **Set Up Environment Variables:**
- Create a `.env.local` file in the root directory.
- Add your Supabase credentials:
  ```
  NEXT_PUBLIC_SUPABASE_URL=<supabase-url>
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
  ```

4. **Initialize and Seed the Database:**
- Use the Supabase dashboard or API to set up the required tables (`apartments` and `rooms`).

5. **Run the Development Server:**
6. **Access the Application:**
- Open your browser and go to `http://localhost:3000/apartments` to view the list of apartments.
- Navigate to `http://localhost:3000/apartment/[id]` to view details of a specific apartment.
