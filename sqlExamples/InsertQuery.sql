INSERT INTO [EXCELP&D].[dbo].[Lot Order Details]([Lot ID], [Job IDFK], [Room ID], [Construction ID], [Cabinet Count], 
        [Material ID], [Door ID], [Fingerpull ID], [Door Qty], [DoorBuyOutYN], [Glass Doors], [Glass Shelves], [Color ID], 
        [Glaze ID], [Interior ID], [Hinge ID], [Hinge Qty], [Knob ID], [Knob Qty], [Drawer Box ID], [Drawer Box Qty], [DrawerBoxBuyOutYN], 
        [Drawer Guide ID], [Drawer Guide Qty], [Drawer Front ID], [Pull ID], [Pull Qty], [Knob 2 ID], [Knob 2 Qty], [Pull 2 ID], [Pull 2 Qty], [Hardware Comments], [Accessory ID])
        VALUES( (SELECT [Lot ID] FROM [EXCELP&D].[dbo].[Lots] WHERE [Job IDFK] = 10171 AND [Lot Number] = '152'),
					1,'s',1,1,1,'ECI-000','OD-2',1,1,' ',' ',1,1,1,1,1,'113BSN',1,1,1,1,1,1,1,'102A',1,' ',1,' ',1,' ',1)