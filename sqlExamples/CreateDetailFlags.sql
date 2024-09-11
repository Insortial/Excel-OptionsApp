--ALTER TABLE Colors 
--DROP COLUMN inUse;

--ALTER TABLE Interiors 
--DROP COLUMN inUse;

--ALTER TABLE Materials 
--DROP COLUMN inUse;

--ALTER TABLE Colors
--ADD inUse BIT;

--ALTER TABLE Interiors
--ADD inUse BIT;

--ALTER TABLE Materials
--ADD inUse BIT;

--ALTER TABLE [Construction Type]
--ADD inUse BIT;

--ALTER TABLE [Drawer Front]
--ADD inUse BIT;

--ALTER TABLE [Drawer Boxes]
--ADD inUse BIT;

--ALTER TABLE [Hinges]
--ADD inUse BIT;

UPDATE [Hinges]
SET inUse =
CASE WHEN [Hinge Type] IN ('Standard', 'Soft Closing', 'APA Soft Closing Salice') THEN 1
ELSE 0 END;

UPDATE [Hinges]
SET [Hinge Type] = 'APA Soft Closing'
WHERE [Hinge ID] = 5

UPDATE Colors
SET inUse=1; 

UPDATE Materials
SET inUse = 
CASE WHEN [Material Name] IN ('Soft Maple', 'White Oak Rift', 'MDF', 'Thermofoil 1-sided', 'Thermofoil 2-sided', 'Acrylic', 'Melamine', 'Laminate') THEN 1
ELSE 0 END;

UPDATE Interiors
SET inUse = 
CASE WHEN [Interior Type] IN ('Hard Rock Maple', 'CUSTOM White Melamine', 'Fog Grey') THEN 0
ELSE 1 END;

--UPDATE [Construction Type]
--SET inUse = 
--CASE WHEN [Construction Type] IN ('FaceFrame', 'Euro') THEN 1
--ELSE 0 END;

UPDATE [Drawer Boxes]
SET inUse = 1;

UPDATE [Drawer Front]
SET inUse =
CASE WHEN [Drawer Front Type] IN ('Solid', 'Five Piece') THEN 1
ELSE 0 END;

--INSERT INTO [Construction Type] ([Construction Type], inUse) VALUES ('FF/Euro', 1);