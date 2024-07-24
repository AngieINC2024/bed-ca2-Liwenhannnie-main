const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
};

bcrypt.hash("1234", saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

    const SQLSTATEMENT = `
  DROP TABLE IF EXISTS User;

  DROP TABLE IF EXISTS Task;

  DROP TABLE IF EXISTS TaskProgress;

  DROP TABLE IF EXISTS Fairy;

  DROP TABLE IF EXISTS Fairy_Level;

  DROP TABLE IF EXISTS Enemy;

  DROP TABLE IF EXISTS Attack;

  DROP TABLE IF EXISTS Arena;

  DROP TABLE IF EXISTS Messages;

  CREATE TABLE User (
      user_id INT PRIMARY KEY AUTO_INCREMENT,
      username TEXT,
      email TEXT
      
      );

  CREATE TABLE Task (
      task_id INT PRIMARY KEY AUTO_INCREMENT,
      title TEXT,
      description TEXT,
      points INT
  );

  CREATE TABLE TaskProgress (
      progress_id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      task_id INT NOT NULL,
      completion_date TIMESTAMP,
      notes TEXT
  );


  CREATE TABLE Fairy (
    fairy_id INT PRIMARY KEY AUTO_INCREMENT,
    fairy_name TEXT,
    power TEXT,
    health INT NOT NULL,
    level TEXT,
    points INT NOT NULL
  );

  CREATE Table Enemy (
    enemy_id INT PRIMARY KEY AUTO_INCREMENT,
    enemy_name TEXT,
    power TEXT,
    health INT NOT NULL
  );

  CREATE Table Attack (
    attack_id INT PRIMARY KEY AUTO_INCREMENT,
    attack_by TEXT,
    attack_type TEXT,
    attack TEXT,
    damage INT NOT NULL,
    description TEXT
  );

  CREATE Table Fairy_level (
    level_id INT PRIMARY KEY AUTO_INCREMENT,
    level_name TEXT,
    level_extraHp INT NOT NULL,
    level_extraDamage INT NOT NULL,
    level_points INT NOT NULL
  );

  CREATE Table Arena (
    fairy_name TEXT,
    enemy_name TEXT,
    attack_type TEXT
  );



  CREATE TABLE Messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    message_text TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );



  INSERT INTO Task (task_id, title, description, points) VALUES
  (1, 'Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area', 50),
  (2, 'Use Public Transportation', 'Use public transportation or carpool instead of driving alone', 30),
  (3, 'Reduce Plastic Usage', 'Commit to using resuable bags and containers', 40),
  (4, 'Energy Conservation', 'Turn off lights and appliances when not in use', 25),
  (5, 'Composting', 'Start Composting kitchen scraps to create natural fertilizer', 35),
  (6, 'Defeat Enemy', 'Defeated One of the Enemies',20),
  (7, 'Use Power', 'Use of one of the attacks', 10),
  (8, 'New level', 'New level upgrade', 20)
  ;

  INSERT INTO User (username, email) VALUES
  ('greenUser123', 'user123@example.com'),
  ('testing1234', 'testing@gmai.com')
  ;

  INSERT INTO Fairy (fairy_name, power, health, level, points) VALUES
  ('Bloom', 'Fire', 100, 'Winx', 0),
  ('Stellar', 'Light', 100, 'Winx', 0),
  ('Flora', 'Nature', 100, 'Winx', 0),
  ('Musa', 'Music', 100, 'Winx', 0),
  ('Aisha', 'Water', 100, 'Winx', 0),
  ('Tecna', 'Technology', 100, 'Winx', 0),
  ('Roxy', 'Animals', 100, 'Winx', 0 );


  INSERT INTO Enemy (enemy_id, enemy_name, power, health) VALUES
  (1, 'Icy', 'Ice', 300),
  (2, 'Darcy', 'Illusions',300),
  (3, 'Stormy', 'Storms', 300);


  INSERT INTO Fairy_level (level_name,level_extraHp, level_extraDamage, level_points) VALUES
  ('Winx', 0, 0, 0),
  ('Charmix', 10, 10, 100),
  ('Enchantix', 20, 20, 200),
  ('Believix',  30, 30, 300),
  ('Harmonix',  40, 40, 400),
  ('Sirenix',  50, 50, 500);


  INSERT INTO Attack (attack_by, attack_type, attack, damage, description) VALUES
  ('Fairy', 'Fire', 'Flame of Life', 15 , 'Shoots a ball of fire energy at the target'),
  ('Fairy', 'Fire', 'Heat Wave', 18, 'Shoots a beam of mistry visible fire'),
  ('Fairy', 'Fire', 'Dragon Fury', 20 , 'Using Dragon Energy to cast out a fire comet' ),
  ('Fairy', 'Fire', 'Spreading Fire', 25, 'Creates a misty wave of fire that temporarily blinds enemies'),
  ('Fairy', 'Light', 'Sea of light', 15 , 'Shoots a ray of light'),
  ('Fairy', 'Light', 'Ocean of light', 18, 'Creates a sphere of light'),
  ('Fairy', 'Light', 'Solar Wind', 20, 'Makes a wave of light energy with the scepter'),
  ('Fairy', 'Light', 'Solar Burst', 25, 'Forms a ball of light'),
  ('Fairy', 'Nature', 'Super Pollen' , 15, 'Grows seaweed that wraps around the enemy'),
  ('Fairy', 'Nature', 'Floral Whirlpool', 18, 'Forms a green sphere to be thrown'),
  ('Fairy', 'Nature', 'Roots Of Organ', 20, 'Grows thick vines with spikes around the enemy'),
  ('Fairy', 'Nature', 'Nature Symphony', 25, 'Grabs all the nature energy and shoots a beam of it.'),
  ('Fairy', 'Music', 'Sound Barrier', 15, 'Shoots a dark pink energy ball'),
  ('Fairy', 'Music', 'Sonic Blast', 18, 'Shoots off purple soundwaves and amplifies overtime'),
  ('Fairy', 'Music', 'Power Swirl', '20', 'Creates a purple swirl of energy that can knock the enemy'),
  ('Fairy', 'Music', 'Sonic Mega Blast', 25, 'Shoots blue energy spheres that form red speakers and shoot pink sound waves towards the enemy'),
  ('Fairy', 'Water', 'Plasma World', 15, 'Forms a sphere of morphix'),
  ('Fairy', 'Water', 'Morphix Power', 18, 'Glowing pink beam of morphix'),
  ('Fairy', 'Water', 'Morphix Kick', 20, 'Forms morphix on the leg and releases it at the enemy'),
  ('Fairy', 'Water', 'Thrive of Morphix', 25, 'Unleashes a large swirling blast of Morphix that is strong enough to raise the tides and command them'),
  ('Fairy', 'Technology', 'Compu-Blast', 15, 'Shoots a green chip at the target causing it to explode'),
  ('Fairy', 'Technology', 'Wire Beam', 18 ,'Shoots three green energy balls, when in contact, makes a large blast'),
  ('Fairy', 'Technology', 'Digital Glitch', 20, 'Shoots a net-like sphere to drain enemies health'),
  ('Fairy', 'Techonology','Electic Volcane', 25, 'Launches a ball of mistry dark green of energy at enemy'),
  ('Fairy', 'Animal', 'Wolf Talon', 15, 'Shapes an aquamarine wolf that attcks the enemy'),
  ('Fairy', 'Animal', 'Wild Heartbeat', 18, 'Tames animals that makes them fight for her'),
  ('Fairy', 'Animal', 'Snakes Venom', 20, 'Summons a pair of snake fangs to strike an enemy'),
  ('Fairy', 'Animal', 'Seal Beam', 25, 'Beams out green light and follows the enemy'),
  ('Enemy', 'Ice', 'Icicle Rampage', 15, 'Shoots a white ray of energy'),
  ('Enemy', 'Ice', 'Icicle Shredder', 18, 'Creates a spiky ice ball which chases and shoots after the target'),
  ('Enemy', 'Ice', 'Icicle Blast', 20, 'Shoots beams of icy blue icicles'),
  ('Enemy', 'Ice', 'Ice Shower', 25, 'Shoots ice shards toward enemy'),
  ('Enemy', 'Illusions', 'Chaotic Confusion', 15, 'Shoots spiraling purple beam which panicks the target'),
  ('Enemy', 'Illusions', 'Dark Ray', 18, 'Releases a purple beam of energy'),
  ('Enemy', 'Illusions', 'Dark Breath', 20, 'Shoots a ray of darkness, making all sources of light die'),
  ('Enemy', 'Illusions', 'Pauser Hex', 25, 'Sends a pulse on the ground to stun the target'),
  ('Enemy', 'Storms', 'Howling Storm' , 15, 'Shoots a mistry lavender wave of energy at the enemy'),
  ('Enemy', 'Storms', 'Double Tornado', 18, 'Creates two purple tornadoes with purple lightning around it to trap the enemy'),
  ('Enemy', 'Storms', 'Tordnado of Lightning Bolts', 20, 'Creates a dark cloud with lightning all around it which shoots wind and lightning at the enemy'),
  ('Enemy', 'Storms', 'Voltage Slam', 25, 'Creates a thunderstorm to strike enemies with dangerous light');

  INSERT INTO Messages (message_text, user_id) VALUES
    ("Hello world!", 1),
    ("Yummy!", 2),  
    ("I am the one", 3);


  `;

    pool.query(SQLSTATEMENT, callback);
  }
});
