--UPDATE [EXCELP&D].[dbo].[Hinges]
--SET inUse =
--CASE WHEN [Hinge Type] IN ('Standard', 'Soft Closing', 'APA Soft Closing Salice') THEN 1
--ELSE 0 END;

--UPDATE [EXCELP&D].[dbo].[Hinges]
--SET [Hinge Type] = 'APA Soft Closing'
--WHERE [Hinge ID] = 5

UPDATE [EXCELP&D].[dbo].[Colors]
SET inUse = 
CASE WHEN ([Color] IN ('White Thermofoil', 'Satin White', 'Opti Grey', 'Summer Breeze', 
'Swiss Elm Dark', 'Morning Dew', 'Lausanne PC', 'Alabaster Ash', 'Matte Black', 'Satin Coffee',
'Fontana Night', 'Arturo Candlelight', 'Charcoal Matte 30WK', 'Oak Burlap', 'Dark Grey 5810/SF', 'Latitude North',
'Cashmere', 'Kazablanka', 'Verdi') AND [Finish Type] = 'Thermofoil') 
OR ([Color] IN ('N/A', 'Unfinished', 'True Maple', 'Alto', 'Luxe Blanco')) 
OR ([Color] IN ('Driftwood', 'Charcoal', 'Smoke', 'True Maple', 'Nutmeg', 'Kona 1 Pass', 'Vintage', 'Sand') AND [Finish Type] LIKE 'Stain%') 
OR ([Color] IN ('Anew Grey', 'Painted 001 White', 'Capricorn', 'Tax Day', 'Raccoon', 'Summer Drops') AND [Finish Type] = 'Painted Finish') THEN 1
ELSE 0 END; 

--UPDATE [EXCELP&D].[dbo].[Materials]
--SET inUse = 
--CASE WHEN [Material Name] IN ('Soft Maple', 'White Oak Rift', 'MDF', 'Thermofoil 1-sided', 'Thermofoil 2-sided', 'Acrylic', 'Melamine', 'Laminate') THEN 1
--ELSE 0 END;

--UPDATE [EXCELP&D].[dbo].[Interiors]
--SET inUse = 
--CASE WHEN [Interior Type] IN ('Hard Rock Maple', 'CUSTOM White Melamine', 'Fog Grey') THEN 0
--ELSE 1 END;

--UPDATE [EXCELP&D].[dbo].[Construction Type]
--SET inUse = 
--CASE WHEN [Construction Type] IN ('FaceFrame', 'Euro') THEN 1
--ELSE 0 END;

--UPDATE [EXCELP&D].[dbo].[Drawer Boxes]
--SET inUse = 1;

--UPDATE [EXCELP&D].[dbo].[Drawer Front]
--SET inUse =
--CASE WHEN [Drawer Front Type] IN ('Solid', 'Five Piece') THEN 1
--ELSE 0 END;

--INSERT INTO [EXCELP&D].[dbo].[Construction Type] ([Construction Type], inUse) VALUES ('FF/Euro', 1);

--UPDATE [EXCELP&D].[dbo].[Doors]
--SET inUse =
--CASE WHEN [Door ID] IN ('N/A', 'ECI-115', 'ECI-210', 'ECI-215', 'ECI-230', 'ECI-240', 'ECI-330', 
--'ECI-370', 'ECI-371', 'ECI-375', 'ECI-376', 'ECI-380', 'ECI-390', 'ECI-400', 'ECI-405', 'ECI-420', 
--'ECI-435', 'ECI-605', 'ECI-606', 'ECI-615', 'ECI-625', 'ECI-640') THEN 1
--ELSE 0 END;