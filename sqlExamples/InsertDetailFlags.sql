UPDATE [EXCELP&D].[dbo].[Hinges]
SET inUse =
CASE WHEN [Hinge Type] IN ('Standard', 'Soft Closing', 'APA Soft Closing Salice') THEN 1
ELSE 0 END;

UPDATE [EXCELP&D].[dbo].[Hinges]
SET [Hinge Type] = 'APA Soft Closing'
WHERE [Hinge ID] = 5

UPDATE [EXCELP&D].[dbo].[Colors]
SET inUse=1; 

UPDATE [EXCELP&D].[dbo].[Materials]
SET inUse = 
CASE WHEN [Material Name] IN ('Soft Maple', 'White Oak Rift', 'MDF', 'Thermofoil 1-sided', 'Thermofoil 2-sided', 'Acrylic', 'Melamine', 'Laminate') THEN 1
ELSE 0 END;

UPDATE [EXCELP&D].[dbo].[Interiors]
SET inUse = 
CASE WHEN [Interior Type] IN ('Hard Rock Maple', 'CUSTOM White Melamine', 'Fog Grey') THEN 0
ELSE 1 END;

UPDATE [EXCELP&D].[dbo].[Construction Type]
SET inUse = 
CASE WHEN [Construction Type] IN ('FaceFrame', 'Euro') THEN 1
ELSE 0 END;

UPDATE [EXCELP&D].[dbo].[Drawer Boxes]
SET inUse = 1;

UPDATE [EXCELP&D].[dbo].[Drawer Front]
SET inUse =
CASE WHEN [Drawer Front Type] IN ('Solid', 'Five Piece') THEN 1
ELSE 0 END;

INSERT INTO [EXCELP&D].[dbo].[Construction Type] ([Construction Type], inUse) VALUES ('FF/Euro', 1);