-- Creating the Staff table
CREATE TABLE Staffs (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255),
    psn VARCHAR(255),
    ipps_id VARCHAR(255),
    mda VARCHAR(255),
    bank VARCHAR(255),
    accountNo VARCHAR(255),
    bvn VARCHAR(255),
    gradeLevel VARCHAR(255),
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Creating the Application table
CREATE TABLE Applications (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255),
    psn VARCHAR(255),
    gradeLevel VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    nin VARCHAR(255),
    bvn VARCHAR(255),
    bank VARCHAR(255),
    accountNo VARCHAR(255),
    mda VARCHAR(255),
    state VARCHAR(255),
    judiciary VARCHAR(255),
    assembly VARCHAR(255),
    phc VARCHAR(255),
    lgea VARCHAR(255),
    lga VARCHAR(255),
    polappointee VARCHAR(255),
    farmLoc VARCHAR(255),
    farmLga VARCHAR(255),
    farmWard VARCHAR(255),
    community VARCHAR(255),
    cordinate VARCHAR(255),
    consent VARCHAR(255),
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Creating the User table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255),
    image VARCHAR(255),
    secret VARCHAR(255),
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
