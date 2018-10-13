--BEGIN TRANSACTION;

-- Table: tasignaciondependiente
CREATE TABLE IF NOT EXISTS tasignaciondependiente (
    pkidsqlite                INTEGER PRIMARY KEY AUTOINCREMENT,
    pkidasignaciondependiente INTEGER NOT NULL,
    fkidtercero               INTEGER NOT NULL,
    fkidasignacionpuesto      INTEGER NOT NULL
);

DROP TABLE IF EXISTS tconfiguracion;
-- Table: tconfiguracion
CREATE TABLE IF NOT EXISTS tconfiguracion (
    pkidsqlite         INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidconfiguracion  INTEGER       NOT NULL,
    claveconfiguracion VARCHAR (225) NOT NULL,
    valorconfiguracion VARCHAR (225) NOT NULL
);


-- Table: tusuario
DROP TABLE IF EXISTS tusuario;
CREATE TABLE IF NOT EXISTS tusuario (
    pkidsqlite     INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidusuario    INTEGER       NOT NULL,
    identificacion INTEGER       NOT NULL,
    nombreusuario  VARCHAR (225) NOT NULL,
    apellido       VARCHAR (225),
    usuarioactivo  VARCHAR (5)   NOT NULL,
    fkidrol        INTEGER       NOT NULL,
    contrasenia    VARCHAR (225),
    rutaimagen     VARCHAR (225),
    numerorecibo   INTEGER       NOT NULL
);


-- Table: tequipo
DROP TABLE IF EXISTS tequipo;
CREATE TABLE IF NOT EXISTS tequipo (
    pkidsqlite           INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidequipo           INTEGER       NOT NULL,
    nombrequipo          VARCHAR (225) NOT NULL,
    identificacionequipo VARCHAR (225) NOT NULL
);


-- Table: tparqueadero
DROP TABLE IF EXISTS tparqueadero;
CREATE TABLE IF NOT EXISTS tparqueadero (
    pkidsqlite          INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidparqueadero     INTEGER       NOT NULL,
    numeroparqueadero   VARCHAR (225) NOT NULL,
    fkidtipoparqueadero INTEGER       NOT NULL,
    fkidplaza           INTEGER       NOT NULL
);


-- Table: tplaza
DROP TABLE IF EXISTS tplaza;
CREATE TABLE IF NOT EXISTS tplaza (
    pkidsqlite  INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidplaza   INTEGER       NOT NULL,
    nombreplaza VARCHAR (225) NOT NULL
);


-- Table: tplazatiporecaudo
DROP TABLE IF EXISTS tplazatiporecaudo; 
CREATE TABLE IF NOT EXISTS tplazatiporecaudo (
    pkidsqlite           INTEGER PRIMARY KEY AUTOINCREMENT,
    pkidplazatiporecaudo INTEGER NOT NULL,
    fkidplaza            INTEGER NOT NULL,
    fkidtiporecaudo      INTEGER NOT NULL
);


-- Table: tpuerta
DROP TABLE IF EXISTS tpuerta;
CREATE TABLE IF NOT EXISTS tpuerta (
    pkidsqlite   INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidpuerta   INTEGER       NOT NULL,
    nombrepuerta VARCHAR (225) NOT NULL,
    fkidplaza    INTEGER       NOT NULL
);


-- Table: trecibopuestoeventual
CREATE TABLE IF NOT EXISTS trecibopuestoeventual (
    pkidsqlite                          INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidrecibopuestoeventual            INTEGER       NOT NULL,
    numerorecibopuestoeventual          VARCHAR (225) NOT NULL,
    valorecibopuestoeventual            DOUBLE        NOT NULL,
    creacionrecibopuestoeventual        DATETIME      NOT NULL,
    modificacionrecibopuestoeventual    DATETIME      NOT NULL,
    identificacionterceropuestoeventual VARCHAR (225) NOT NULL,
    fkidtarifapuestoeventual            INTEGER       NOT NULL,
    fkidplaza                           INTEGER,
    valortarifa                         DOUBLE,
    nombreplaza                         VARCHAR (255),
    nombreterceropuestoeventual         VARCHAR (225),
    recibopuestoeventualactivo          INTEGER       NOT NULL,
    nombresector                        VARCHAR (255),
    fkidsector                          INTEGER,
    identificacionrecaudador            VARCHAR (225),
    nombrerecaudador                    VARCHAR (225),
    apellidorecaudador                  VARCHAR (225),
    fkidusuariorecaudador               INTEGER,
    sincronizado                        INTEGER
);



-- Table: tsector
DROP TABLE IF EXISTS tsector;
CREATE TABLE IF NOT EXISTS tsector (
    pkidsqlite     INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidsector     INTEGER       NOT NULL,
    nombresector   VARCHAR (225) NOT NULL,
    fkidplaza      INTEGER,
    fkidtiposector INTEGER       NOT NULL
);




-- Table: ttercero
CREATE TABLE IF NOT EXISTS ttercero (
    pkidsqlite            INTEGER       PRIMARY KEY AUTOINCREMENT,
    nombretercero         VARCHAR (225) NOT NULL,
    identificaciontercero VARCHAR (225) NOT NULL,
    telefonotercero       VARCHAR (225),
    creaciontercero       DATETIME      NOT NULL,
    modificaciontercero   DATETIME      NOT NULL,
    pkidtercero           INTEGER       NOT NULL,
    tipotercero           VARCHAR (225) NOT NULL
);
DELETE FROM ttercero WHERE pkidtercero<>-1;

-- Table: ttipoanimal
DROP TABLE IF EXISTS ttipoanimal;
CREATE TABLE IF NOT EXISTS ttipoanimal (
    pkidsqlite       INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidtipoanimal   INTEGER       NOT NULL,
    idtarifa         INTEGER       NOT NULL,
    tarifa           DOUBLE        NOT NULL,
    nombretipoanimal VARCHAR (225) NOT NULL
);


-- Table: ttiporecaudo
DROP TABLE IF EXISTS ttiporecaudo;
CREATE TABLE IF NOT EXISTS ttiporecaudo (
    pkidsqlite        INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidtiporecaudo   INTEGER       NOT NULL,
    nombretiporecaudo VARCHAR (255) NOT NULL,
    tiporecaudoactivo VARCHAR (5)   NOT NULL
);


-- Table: ttipovehiculo
DROP TABLE IF EXISTS  ttipovehiculo;
CREATE TABLE IF NOT EXISTS ttipovehiculo (
    pkidsqlite         INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidtipovehiculo   INTEGER       NOT NULL,
    idtarifa           INTEGER       NOT NULL,
    tarifa             DOUBLE        NOT NULL,
    nombretipovehiculo VARCHAR (225) NOT NULL
);


-- Table: ttipoparqueadero
DROP TABLE IF EXISTS  ttipoparqueadero;
CREATE TABLE IF NOT EXISTS ttipoparqueadero (
    pkidsqlite            INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidtipoparqueadero   INTEGER       NOT NULL,
    idtarifa              INTEGER       NOT NULL,
    tarifa                DOUBLE        NOT NULL,
    nombretipoparqueadero VARCHAR (225) NOT NULL
);

/**/

-- Table: ttipopuesto
DROP TABLE IF EXISTS ttipopuesto;
CREATE TABLE IF NOT EXISTS ttipopuesto (
    pkidsqlite            INTEGER       PRIMARY KEY AUTOINCREMENT,
    codigotipopuesto        VARCHAR (225)   NOT NULL,
    nombretipopuesto        VARCHAR (225)   NOT NULL,
    descripciontipopuesto   VARCHAR (225)   NOT NULL,
    tipopuestoactivo        INTEGER         NOT NULL,
    creaciontipopuesto      DATETIME        NOT NULL,
    modificaciontipopuesto  DATETIME        NOT NULL,
    pkidtipopuesto          INTEGER         NOT NULL
);

-- Table: tcategoriaanimal
DROP TABLE IF EXISTS  tcategoriaanimal;
CREATE TABLE IF NOT EXISTS tcategoriaanimal (    
    pkidsqlite                  INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidcategoriaanimal         INTEGER         NOT NULL,
    nombrecategoriaanimal       VARCHAR (225)   NOT NULL,
    descripcioncategoriaanimal  VARCHAR (225)   NOT NULL,
    creacioncategoriaanimal     DATETIME        NOT NULL,
    modificacioncategoriaanimal DATETIME        NOT NULL,
    categoriaanimalactivo       INTEGER         NOT NULL,
    codigocategoriaanimal   VARCHAR (225)       NOT NULL
);

-- Table: tespecieanimal
DROP TABLE IF EXISTS tespecieanimal;
CREATE TABLE IF NOT EXISTS tespecieanimal (
    pkidsqlite            INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidespecieanimal           INTEGER         NOT NULL,
    codigoespecieanimal         VARCHAR (225)   NOT NULL,
    nombreespecieanimal         VARCHAR (225)   NOT NULL,
    especieanimalactivo         INTEGER         NOT NULL,
    creacionespecieanimal       DATETIME        NOT NULL,
    modificacionespecieanimal   DATETIME        NOT NULL,
    fkidtipoanimal              INTEGER         NOT NULL
);

-- Table: treciboparqueadero
CREATE TABLE IF NOT EXISTS treciboparqueadero (
    pkidsqlite                          INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidreciboparqueadero               INTEGER         NOT NULL,
    numeroreciboparqueadero             VARCHAR (225)   NOT NULL,
    valoreciboparqueadero               DOUBLE          NOT NULL,
    creacionreciboparqueadero           DATETIME        NOT NULL,
    modificacionreciboparqueadero       DATETIME        NOT NULL,
    nombreusuarioparqueadero            VARCHAR (225)   NOT NULL,
    fkidtarifaparqueadero               INTEGER         NOT NULL,
    valortarifa                         DOUBLE          NOT NULL,
    nombreterceroparqueadero            VARCHAR (225)   NOT NULL,
    identificacionterceroparqueadero    VARCHAR (225)   NOT NULL,
    nombreplaza                         VARCHAR (225)   NOT NULL,
    reciboparqueaderoactivo             INTEGER         NOT NULL,
    fkidplaza                           INTEGER         NOT NULL,
    fkidparqueadero                     INTEGER         NOT NULL,
    fkidtipoparqueadero                 INTEGER         NOT NULL,
    numeroparqueadero                   VARCHAR (225)   NOT NULL,
    nombretipoparqueadero               VARCHAR (225)   NOT NULL,
    identificacionrecaudador            VARCHAR (225)   NOT NULL,
    nombrerecaudador                    VARCHAR (225)   NOT NULL,
    apellidorecaudador                  VARCHAR (225)   NOT NULL,
    fkidusuariorecaudador               INTEGER,
    sincronizado                        INTEGER
);

-- Table: trecibopesaje
CREATE TABLE IF NOT EXISTS trecibopesaje (
    pkidsqlite                      INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidrecibopesaje                INTEGER         NOT NULL,
    numerorecibopesaje              VARCHAR (225)   NOT NULL,
    valorecibopesaje                DOUBLE          NOT NULL,
    pesoanimal                      DOUBLE          NOT NULL,
    creacionrecibopesaje            DATETIME        NOT NULL,
    modificacionrecibopesaje        DATETIME        NOT NULL,
    fkidtarifapesaje                INTEGER,
    valortarifa                     DOUBLE          NOT NULL,
    nombreterceropesaje             VARCHAR (225)   NOT NULL,
    identificacionterceropesaje     VARCHAR (225)   NOT NULL,
    nombreplaza                     VARCHAR (225)   NOT NULL,
    recibopesajeactivo              INTEGER         NOT NULL,
    fkidplaza                       INTEGER         NOT NULL,
    fkidcategoriaanimal             INTEGER         NOT NULL,
    nombrecategoriaanimal           VARCHAR (225)   NOT NULL,
    fkidtipoanimal                  INTEGER         NOT NULL,
    nombretipoanimal                VARCHAR (225)   NOT NULL,
    fkidespecieanimal               INTEGER,
    nombreespecieanimal             VARCHAR (225)   NOT NULL,
    identificacionrecaudador        VARCHAR (225)   NOT NULL,
    nombrerecaudador                VARCHAR (225)   NOT NULL,
    apellidorecaudador              VARCHAR (225)   NOT NULL,
    fkidusuariorecaudador           INTEGER,
    sincronizado                    INTEGER
);

-- Table: trecibovehiculo
CREATE TABLE IF NOT EXISTS trecibovehiculo (
    pkidsqlite                      INTEGER       PRIMARY KEY AUTOINCREMENT,
    numerorecibovehiculo            VARCHAR (225)       NOT NULL,
    numeroplaca                     VARCHAR (225)       NOT NULL,
    valorecibovehiculo              DOUBLE              NOT NULL,
    creacionrecibovehiculo          DATETIME            NOT NULL,
    modificacionrecibovehiculo      DATETIME            NOT NULL,
    pkidrecibovehiculo              INTEGER             NOT NULL,
    fkidtarifavehiculo              INTEGER             NOT NULL,
    valortarifa                     DOUBLE              NOT NULL,
    nombretercerovehiculo           VARCHAR (225)       NOT NULL,
    identificaciontercerovehiculo   VARCHAR (225)       NOT NULL,
    nombreplaza                     VARCHAR (225)       NOT NULL,
    recibovehiculoactivo            INTEGER             NOT NULL,
    fkidplaza                       INTEGER             NOT NULL,
    fkidtipovehiculo                INTEGER             NOT NULL,
    nombretipovehiculo              VARCHAR (225)       NOT NULL,
    identificacionrecaudador        VARCHAR (225)       NOT NULL,
    nombrerecaudador                VARCHAR (225)       NOT NULL,
    apellidorecaudador              VARCHAR (225)       NOT NULL,
    fkidusuariorecaudador           INTEGER,
    nombrepuerta                    VARCHAR (225)       NOT NULL,
    fkidpuerta                      INTEGER,
    sincronizado                    INTEGER
);

-- Table: trecibopuesto

CREATE TABLE IF NOT EXISTS trecibopuesto (
    pkidsqlite                       INTEGER             PRIMARY KEY AUTOINCREMENT,
    numerofactura                    VARCHAR (225)       NOT NULL,
    nombrebeneficiario               VARCHAR (225)       NOT NULL,
    identificacionbeneficiario       VARCHAR (225)       NOT NULL,
    saldo                            DOUBLE              NOT NULL,
    numeroacuerdo                    VARCHAR (225),
    valorcuotaacuerdo                DOUBLE,
    valormultas                      DOUBLE,
    valorinteres                     DOUBLE,
    mesfactura                       VARCHAR (225)       NOT NULL,
    creacionrecibo                   DATETIME            NOT NULL,
    modificacionrecibo               DATETIME            NOT NULL,
    pkidrecibopuesto                 INTEGER             NOT NULL,
    fkidfactura                      INTEGER             NOT NULL,
    numerorecibo                     VARCHAR (225)       NOT NULL,
    nombreterceropuesto              VARCHAR (225),
    identificacionterceropuesto      VARCHAR (225),
    nombreplaza                      VARCHAR (225),
    recibopuestoactivo               INTEGER             NOT NULL,
    numeroresolucionasignacionpuesto [CHARACTER VARYING],
    numeropuesto                     VARCHAR (225),
    nombresector                     VARCHAR (225),
    fkidzona                         INTEGER             NOT NULL,
    fkidsector                       INTEGER             NOT NULL,
    fkidpuesto                       INTEGER             NOT NULL,
    fkidasignacionpuesto             INTEGER             NOT NULL,
    fkidplaza                        INTEGER             NOT NULL,
    fkidbeneficiario                 INTEGER             NOT NULL,
    fkidacuerdo                      INTEGER,
    identificacionrecaudador         VARCHAR (225),
    nombrerecaudador                 VARCHAR (225),
    apellidorecaudador               VARCHAR (225),
    fkidusuariorecaudador            INTEGER,
    valorpagado                      DOUBLE              NOT NULL,
    saldoporpagar                    DOUBLE,
    nombrezona                       VARCHAR (225),
    abonototalacuerdo                DOUBLE,
    abonocuotaacuerdo                DOUBLE,
    abonodeudaacuerdo                DOUBLE,
    abonodeuda                       DOUBLE,
    abonomultas                      DOUBLE,
    abonocuotames                    DOUBLE,
    sincronizado                     INTEGER
);

-- Table: ttarifaparqueadero
DROP TABLE IF EXISTS ttarifaparqueadero;
CREATE TABLE IF NOT EXISTS ttarifaparqueadero (
    pkidsqlite                          INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidtarifaparqueadero               INTEGER             NOT NULL,
    valortarifaparqueadero              DOUBLE DEFAULT 0    NOT NULL,
    descripciontarifaparqueadero        VARCHAR (225),
    numeroresoluciontarifaparqueadero   VARCHAR (225)       NOT NULL,
    documentoresoluciontarifaparqueadero text,
    craciontarifaparqueadero            DATETIME            NOT NULL,
    modificaciontarifaparqueadero       DATETIME            NOT NULL,
    tarifaparqueaderoactivo             INTEGER,
    valorincrementoporcentual           DOUBLE DEFAULT 0    NOT NULL,
    fkidtipoparqueadero                 INTEGER,
    fkidplaza                           INTEGER
);

-- Table: ttarifapesaje
DROP TABLE IF EXISTS ttarifapesaje;
CREATE TABLE IF NOT EXISTS ttarifapesaje (
    pkidsqlite                      INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidtarifapesaje                INTEGER             NOT NULL,
    valortarifapesaje               DOUBLE              NOT NULL,
    numeroresoluciontarifapesaje    VARCHAR (225)       NOT NULL,
    documentoresoluciontarifapesaje text,
    creaciontarifapesaje            DATETIME            NOT NULL,
    modificaciontarifapesaje        DATETIME            NOT NULL,
    fkidplaza                       INTEGER             NOT NULL,
    tarifapesajeactivo              INTEGER,
    valorincrementoporcentual       DOUBLE DEFAULT 0    NOT NULL,
    descripciontarifapesaje         VARCHAR (225)       NOT NULL
);

-- Table: ttarifapuesto
DROP TABLE IF EXISTS ttarifapuesto;
CREATE TABLE IF NOT EXISTS ttarifapuesto (
    pkidsqlite                      INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidtarifapuesto                INTEGER             NOT NULL,
    valortarifapuesto               DOUBLE DEFAULT 0    NOT NULL,
    creaciontarifapuesto            DATETIME            NOT NULL,
    modificaciontarifapuesto        DATETIME            NOT NULL,
    numeroresoluciontarifapuesto    VARCHAR (225)       NOT NULL,
    documentoresoluciontarifapuesto text,
    tarifapuestoactivo              INTEGER,
    valorincrementoporcentual       DOUBLE DEFAULT 0    NOT NULL,
    fkidplaza                       INTEGER
);

-- Table: ttarifapuestoeventual
DROP TABLE IF EXISTS ttarifapuestoeventual;
CREATE TABLE IF NOT EXISTS ttarifapuestoeventual (
    pkidsqlite                              INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidtarifapuestoeventual                INTEGER             NOT NULL,
    valortarifapuestoeventual               DOUBLE DEFAULT 0    NOT NULL,
    descripciontarifapuestoeventual         VARCHAR (225),
    numeroresoluciontarifapuestoeventual    VARCHAR (225)       NOT NULL,
    documentoresoluciontarifapuestoeventual text,
    craciontarifapuestoeventual             DATETIME            NOT NULL,
    modificaciontarifapuestoeventual        DATETIME            NOT NULL,
    fkidplaza                               INTEGER             NOT NULL,
    tarifapuestoeventualactivo              INTEGER,
    valorincrementoporcentual               DOUBLE DEFAULT 0    NOT NULL
);


-- Table: ttarifavehiculo
DROP TABLE IF EXISTS ttarifavehiculo;
CREATE TABLE IF NOT EXISTS ttarifavehiculo (
    pkidsqlite                          INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidtarifavehiculo                  INTEGER             NOT NULL,
    valortarifavehiculo                 DOUBLE DEFAULT 0    NOT NULL,
    descripciontarifavehiculo           VARCHAR (225),
    craciontarifavehiculo               DATETIME            NOT NULL,
    modificaciontarifavehiculo          DATETIME            NOT NULL,
    numeroresoluciontarifavehiculo      VARCHAR (225)       NOT NULL,
    documentoresoluciontarifavehiculo   text,
    fkidtipovehiculo                    INTEGER             NOT NULL,
    fkidplaza                           INTEGER             NOT NULL,
    tarifavehiculoactivo                INTEGER,
    valorincrementoporcentual           DOUBLE DEFAULT 0    NOT NULL
);


-- Table: tfactura
DROP TABLE IF EXISTS tfactura;
CREATE TABLE IF NOT EXISTS tfactura ( 
    pkidsqlite                      INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidfactura                     INTEGER         NOT NULL,
    numerofactura                   VARCHAR (255)   NOT NULL,
    nombrebeneficiario              VARCHAR (255)   NOT NULL,
    identificacionbeneficiario      VARCHAR (255)   NOT NULL,
    deudatotal                      DOUBLE          NOT NULL,
    tarifapuesto                    DOUBLE          NOT NULL,
    numeroacuerdo                   VARCHAR (255),
    valorcuotaacuerdo               DOUBLE,
    valormultas                     DOUBLE          NOT NULL,
    valorinteres                    DOUBLE,
    mesfactura                      VARCHAR (255)   NOT NULL,
    creacionfactura                 DATETIME        NOT NULL,
    modificacionfactura             DATETIME        NOT NULL,
    fkidasignacionpuesto            INTEGER         NOT NULL,
    facturapagada                   INTEGER         NOT NULL,
    saldoasignacion                 DOUBLE          NOT NULL,
    saldomultas                     DOUBLE          NOT NULL,
    mesfacturaletras                VARCHAR (255)   NOT NULL,
    year                            INTEGER         NOT NULL,
    saldoacuerdo                    DOUBLE          NOT NULL,
    nombrepuesto                    VARCHAR (255)   NOT NULL,
    fkidplaza                       INTEGER         NOT NULL,
    fkidzona                        INTEGER         NOT NULL,
    fkidsector                      INTEGER         NOT NULL,
    nombreplaza                     VARCHAR (255)   NOT NULL,
    nombrezona                      VARCHAR (255)   NOT NULL,
    nombresector                    VARCHAR (255)   NOT NULL,
    totalpagado                     DOUBLE          NOT NULL,
    mesfacturanumero                INTEGER         NOT NULL,
    fkidpuesto                      INTEGER         NOT NULL,
    fkidacuerdo                     INTEGER,
    cuotasincumplidas               INTEGER         NOT NULL,
    cuotaspagadas                   INTEGER         NOT NULL,
    totalapagarmes                  DOUBLE          NOT NULL,
    fechapagototal                  DATE,
    saldodeuda                      DOUBLE          NOT NULL,
    saldodeudaacuerdo               DOUBLE          NOT NULL,
    saldoporpagar                   DOUBLE          NOT NULL,
    debermes                        INTEGER         NOT NULL,
    deberyear                       INTEGER         NOT NULL,
    facturaactivo                   INTEGER         NOT NULL,
    abonototalacuerdo               DOUBLE,
    abonocuotaacuerdo               DOUBLE,
    abonodeudaacuerdo               DOUBLE,
    abonodeuda                      DOUBLE,
    abonomultas                     DOUBLE,
    abonocuotames                   DOUBLE
);


-- Table: tzona
DROP TABLE IF EXISTS tzona;
CREATE TABLE IF NOT EXISTS tzona (
    pkidsqlite              INTEGER       PRIMARY KEY AUTOINCREMENT,
    pkidzona                INTEGER         NOT NULL,
    codigozona              VARCHAR (225)   NOT NULL,
    nombrezona              VARCHAR (225)   NOT NULL,
    zonaactivo              INTEGER         NOT NULL,
    creacionzona            DATETIME        NOT NULL,
    modificacionzona        DATETIME        NOT NULL,
    fkidplaza               INTEGER,
    fkidusuario             INTEGER
);




-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- --------------------------------------------------- DATOS DE PRUEBA ---------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------
-- -----------------------------------------------------------------------------------------------------------------------

-- /*
-- INSERT INTO tparqueadero (
--                              pkidparqueadero,
--                              numeroparqueadero,
--                              fkidtipoparqueadero,
--                              fkidplaza
--                          )
--                          VALUES (
--                              1,
--                              'Parqueadero',
--                              1,
--                              1
--                          );

-- INSERT INTO tparqueadero (
--                              pkidparqueadero,
--                              numeroparqueadero,
--                              fkidtipoparqueadero,
--                              fkidplaza
--                          )
--                          VALUES (
--                              2,
--                              'Lote',
--                              2,
--                              1
--                          );


-- INSERT INTO tplaza (
--                        pkidplaza,
--                        nombreplaza
--                    )
--                    VALUES (
--                        1,
--                        'POTRERILLO'
--                    );


-- INSERT INTO tpuerta (
--                         pkidpuerta,
--                         nombrepuerta,
--                         fkidplaza
--                     )
--                     VALUES (
--                         1,
--                         'Puerta Terminal',
--                         1
--                     );

-- INSERT INTO tpuerta (
--                         pkidpuerta,
--                         nombrepuerta,
--                         fkidplaza
--                     )
--                     VALUES (
--                         2,
--                         'Puerta principal',
--                         1
--                     );


-- INSERT INTO tsector (
--                         pkidsector,
--                         nombresector,
--                         fkidplaza,
--                         fkidtiposector
--                     )
--                     VALUES (
--                         1,
--                         'AVES',
--                         1,
--                         1
--                     );

-- INSERT INTO tsector (
--                         pkidsector,
--                         nombresector,
--                         fkidplaza,
--                         fkidtiposector
--                     )
--                     VALUES (
--                         2,
--                         'FRUTAS',
--                         1,
--                         1
--                     );

-- INSERT INTO ttipoanimal (
--                             pkidtipoanimal,
--                             idtarifa,
--                             tarifa,
--                             nombretipoanimal
--                         )
--                         VALUES (
--                             2,
--                             3,
--                             8000.0,
--                             'Ganado mayor'
--                         );

-- INSERT INTO ttipoanimal (
--                             pkidtipoanimal,
--                             idtarifa,
--                             tarifa,
--                             nombretipoanimal
--                         )
--                         VALUES (
--                             1,
--                             1,
--                             4000.0,
--                             'Ganado menor'
--                         );


-- INSERT INTO ttipoparqueadero (
--                                  pkidtipoparqueadero,
--                                  idtarifa,
--                                  tarifa,
--                                  nombretipoparqueadero
--                              )
--                              VALUES (
--                                  1,
--                                  2,
--                                  1000.0,
--                                  'Normal'
--                              );

-- INSERT INTO ttipoparqueadero (
--                                  pkidtipoparqueadero,
--                                  idtarifa,
--                                  tarifa,
--                                  nombretipoparqueadero
--                              )
--                              VALUES (
--                                  2,
--                                  4,
--                                  20000.0,
--                                  'Contrato'
--                              );


-- INSERT INTO ttipovehiculo (
--                               pkidtipovehiculo,
--                               idtarifa,
--                               tarifa,
--                               nombretipovehiculo
--                           )
--                           VALUES (
--                               1,
--                               10,
--                               1000.0,
--                               'Camionetas hasta 2600 CC'
--                           );

-- INSERT INTO ttipovehiculo (
--                               pkidtipovehiculo,
--                               idtarifa,
--                               tarifa,
--                               nombretipovehiculo
--                           )
--                           VALUES (
--                               2,
--                               13,
--                               2000.0,
--                               'Vehículos 350 y turbos'
--                           );

-- INSERT INTO ttipovehiculo (
--                               pkidtipovehiculo,
--                               idtarifa,
--                               tarifa,
--                               nombretipovehiculo
--                           )
--                           VALUES (
--                               3,
--                               14,
--                               3000.0,
--                               'Camiones 6000 Cap. 12 Ton'
--                           );

-- INSERT INTO ttipovehiculo (
--                               pkidtipovehiculo,
--                               idtarifa,
--                               tarifa,
--                               nombretipovehiculo
--                           )
--                           VALUES (
--                               4,
--                               15,
--                               4000.0,
--                               'Vehiculos Cap. 12 y 20 Ton'
--                           );

-- INSERT INTO ttipovehiculo (
--                               pkidtipovehiculo,
--                               idtarifa,
--                               tarifa,
--                               nombretipovehiculo
--                           )
--                           VALUES (
--                               5,
--                               16,
--                               5000.0,
--                               'Vehículos Cap. Sup. 20 Ton'
--                           );

-- INSERT INTO ttipovehiculo (
--                               pkidtipovehiculo,
--                               idtarifa,
--                               tarifa,
--                               nombretipovehiculo
--                           )
--                           VALUES (
--                               6,
--                               17,
--                               1300.0,
--                               'Camperos servicio rural'
--                           );

-- INSERT INTO ttipovehiculo (
--                               pkidtipovehiculo,
--                               idtarifa,
--                               tarifa,
--                               nombretipovehiculo
--                           )
--                           VALUES (
--                               7,
--                               18,
--                               1000.0,
--                               'Servicio público autorizado'
--                           );

-- INSERT INTO ttipovehiculo (
--                               pkidtipovehiculo,
--                               idtarifa,
--                               tarifa,
--                               nombretipovehiculo
--                           )
--                           VALUES (
--                               8,
--                               19,
--                               1500.0,
--                               'Vehículos particulares'
--                           );



-- INSERT INTO tconfiguracion (
--                                pkidconfiguracion,
--                                claveconfiguracion,
--                                valorconfiguracion
--                            )
--                            VALUES (
--                                2,
--                                'tarifaeventual',
--                                '2500'
--                            );

-- INSERT INTO tconfiguracion (
--                                pkidconfiguracion,
--                                claveconfiguracion,
--                                valorconfiguracion
--                            )
--                            VALUES (
--                                1,
--                                'idtarifaeventual',
--                                '1'
--                            );



-- INSERT INTO tusuario (
--                          pkidusuario,
--                          identificacion,
--                          nombreusuario,
--                          apellido,
--                          usuarioactivo,
--                          fkidrol,
--                          contrasenia,
--                          rutaimagen,
--                          numerorecibo
--                      )
--                      VALUES (
--                          1,
--                          8530210,
--                          'Alberto',
--                          'Flores',
--                          'true',
--                          0,
--                          '123',
--                          NULL,
--                          1
--                      );


-- INSERT INTO tplazatiporecaudo (
--                                   pkidplazatiporecaudo,
--                                   fkidplaza,
--                                   fkidtiporecaudo
--                               )
--                               VALUES (
--                                   2,
--                                   1,
--                                   2
--                               );

-- INSERT INTO tplazatiporecaudo (
--                                   pkidplazatiporecaudo,
--                                   fkidplaza,
--                                   fkidtiporecaudo
--                               )
--                               VALUES (
--                                   1,
--                                   1,
--                                   1
--                               );


-- INSERT INTO ttiporecaudo (
--                              pkidtiporecaudo,
--                              nombretiporecaudo,
--                              tiporecaudoactivo
--                          )
--                          VALUES (
--                              1,
--                              'Puesto fijo',
--                              '1'
--                          );

-- INSERT INTO ttiporecaudo (
--                              pkidtiporecaudo,
--                              nombretiporecaudo,
--                              tiporecaudoactivo
--                          )
--                          VALUES (
--                              2,
--                              'Puestos eventuales',
--                              '1'
--                          );

-- INSERT INTO ttiporecaudo (
--                              pkidtiporecaudo,
--                              nombretiporecaudo,
--                              tiporecaudoactivo
--                          )
--                          VALUES (
--                              3,
--                              'Ingreso de vehículos',
--                              '1'
--                          );

-- INSERT INTO ttiporecaudo (
--                              pkidtiporecaudo,
--                              nombretiporecaudo,
--                              tiporecaudoactivo
--                          )
--                          VALUES (
--                              4,
--                              'Animales',
--                              '1'
--                          );

-- INSERT INTO ttiporecaudo (
--                              pkidtiporecaudo,
--                              nombretiporecaudo,
--                              tiporecaudoactivo
--                          )
--                          VALUES (
--                              5,
--                              'Pesaje',
--                              '1'
--                          );

-- INSERT INTO ttiporecaudo (
--                              pkidtiporecaudo,
--                              nombretiporecaudo,
--                              tiporecaudoactivo
--                          )
--                          VALUES (
--                              6,
--                              'Parqueadero',
--                              '1'
--                          );


-- INSERT INTO ttercero (
--                          nombretercero,
--                          identificaciontercero,
--                          telefonotercero,
--                          creaciontercero,
--                          modificaciontercero,
--                          pkidtercero,
--                          tipotercero
--                      )
--                      VALUES (
--                          'Pedro Rojas',
--                          '98010101',
--                          '7202020',
--                          '25/9/2018, 2:30:10 p.m',
--                          '25/9/2018, 2:30:10 p.m',
--                          '1',
--                          'tipo tercero 1'
--                      );
                     
-- INSERT INTO ttercero (
--                          nombretercero,
--                          identificaciontercero,
--                          telefonotercero,
--                          creaciontercero,
--                          modificaciontercero,
--                          pkidtercero,
--                          tipotercero
--                      )
--                      VALUES (
--                          'María Perez',
--                          '59020202',
--                          '7303030',
--                          '25/9/2018, 2:30:10 p.m',
--                          '25/9/2018, 2:30:10 p.m',
--                          '2',
--                          'tipo tercero 2'
--                      );
-- */
-- --COMMIT TRANSACTION;