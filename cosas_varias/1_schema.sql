-- Borrar las tablas si ya existen
DROP TABLE IF EXISTS tbflight;
DROP TABLE IF EXISTS tbairport;
DROP TABLE IF EXISTS tbcity;
DROP TABLE IF EXISTS tbcountry;

-- Crear la tabla tbcountry
CREATE TABLE tbcountry (
    countryid INT AUTO_INCREMENT PRIMARY KEY,
    countryname VARCHAR(255) UNIQUE
);

-- Crear la tabla tbcity
CREATE TABLE tbcity (
    cityid INT AUTO_INCREMENT PRIMARY KEY,
    cityname VARCHAR(255),
    countryid INT,
    FOREIGN KEY (countryid) REFERENCES tbcountry(countryid),
    UNIQUE (cityname, countryid)
);

-- Crear la tabla tbairport
CREATE TABLE tbairport (
    airportid INT AUTO_INCREMENT PRIMARY KEY,
    oaci VARCHAR(10),
    iata VARCHAR(10),
    airportname VARCHAR(255),
    cityid INT,
    countryid INT,
    longitude DECIMAL(9,6),
    latitude DECIMAL(9,6),
    FOREIGN KEY (cityid) REFERENCES tbcity(cityid),
    FOREIGN KEY (countryid) REFERENCES tbcountry(countryid)
);

-- Crear la tabla tbflight
CREATE TABLE tbflight (
    flightid INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    origen VARCHAR(10),
    destino VARCHAR(10),
    fechaida VARCHAR(20),
    fechavuelta VARCHAR(20),
    aeropuertoorigen VARCHAR(10),
    aeropuertodestino VARCHAR(10),
    horasalidaida VARCHAR(20),
    horallegadaida VARCHAR(20),
    horasalidavuelta VARCHAR(20),
    horallegadavuelta VARCHAR(20),
    precio DECIMAL(10, 2),
    escalasida INT,
    escalasvuelta INT,
    enlace VARCHAR(255),
    airlineida VARCHAR(50),
    airlinevuelta VARCHAR(50),
    fechacreacion VARCHAR(50),
    FOREIGN KEY (aeropuertoorigen) REFERENCES tbairport(iata),
    FOREIGN KEY (aeropuertodestino) REFERENCES tbairport(iata)
);
