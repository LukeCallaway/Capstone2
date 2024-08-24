CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    calories INTEGER DEFAULT 2300 
        CHECK (calories >= 1200 AND calories <= 4000 ),
    --  protein, carbs, fats are in grams
    protein INTEGER DEFAULT 200
        CHECK (protein >= 15 AND protein <= 400 ),
    carbs INTEGER DEFAULT 450
        CHECK (carbs >= 120 AND carbs <= 700 ),
    fats INTEGER DEFAULT 90
        CHECK (fats >= 20 AND fats <= 180 )
);

CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL
        REFERENCES users ON DELETE CASCADE,
    name TEXT NOT NULL,
    calories INTEGER DEFAULT 0,
    --  protein, carbs, fats are in grams
    protein INTEGER DEFAULT 0,
    carbs INTEGER DEFAULT 0,
    fats INTEGER DEFAULT 0,
    day TEXT,
    time TEXT
);