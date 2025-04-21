DESCRIPTION
-----------
Spotify Dashboard is an interactive visualization tool that generates comprehensive musical profiles for artists. 
Designed for music listeners, researchers, and industry professionals, it offers insights into what makes an artist unique through radar charts, collaboration graphs, 
and similarity rankings based on audio features.

Users can explore detailed artist data, discover similar artists via cosine similarity on precomputed feature vectors, and generate personalized track recommendations. 
The tool emphasizes music discovery and data-driven understanding of the music landscape, powered by a full-stack architecture (React frontend, Django backend) 
and a curated SQLite dataset of over 8 million Spotify tracks.

INSTALLATION
------------
1. Clone the repository:
   git clone https://github.com/Bmocc/Spotify-Dashboard.git
   cd Spotify-Dashboard

2. Download the SQLite database:
   https://drive.google.com/file/d/1-xX6-fOvYAXG7vwF5XIPrmnPjh9_m4rP/view?usp=drive_link
   Place the file `spotify_filtered.sqlite` in the root directory.

3. (Option A) Docker Setup:
   - Ensure Docker is installed.
   - Set the LOCAL_RUN variable in /backend/project/settings.py to 0
   - Run the app:
     docker compose up --build

4. (Option B) Manual Setup:

   - Set the LOCAL_RUN variable in /backend/project/settings.py to 1

   Frontend:
    - cd frontend
    - npm install
    - npm run build

   Backend:
    - cd backend
    - Create a `.env` file in the `backend/` directory and add:

     SECRET_KEY="fjrwyjhyrjyrwj41ywtrj4wytj85w7ui46574oi3w7658l4ow6"


     On macOS, you can do this via terminal:
       touch .env
       nano .env
       (paste in the SECRET_KEY line)
       Ctrl + O (to save)
       Enter (to confirm)
       Ctrl + X (to exit)

    - python -m venv venv
    - source venv/bin/activate   (or venv\Scripts\activate on Windows)
    - pip install -r requirements.txt
    - python manage.py collectstatic (if prompted 
    "This will overwrite existing files!
     Are you sure you want to do this?

     Type 'yes' to continue, or 'no' to cancel: " type "yes" and click Enter)

     - Then start the backend:
       python manage.py runserver

EXECUTION
---------
After setup:

- Access the frontend at: http://localhost:3000 (For Development only)
- Access the backend API at: http://localhost:8000

Use the interface to search for artists, visualize their audio features, explore similar artists, view collaboration networks, and generate track recommendations.
