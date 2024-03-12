
-- CREATE TABLE info (
--     id SERIAL PRIMARY KEY,
--     email VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     title VARCHAR(255) NOT NULL,
--     content TEXT NOT NULL,
--     image BYTEA, -- Assuming you store images as binary data
--     reset_token UUID,
--     reset_token_created_at TIMESTAMP,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    reset_token UUID,
    reset_token_created_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) ,
    content TEXT ,
    image BYTEA,
   
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- CREATE TABLE posts (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     title VARCHAR(255) NOT NULL,
--     content TEXT NOT NULL,
--     image BYTEA,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id)
-- );
