--DROP VIEW prodreadylotsview;

CREATE VIEW prodreadylotsview AS
	SELECT LO.[Lot ID], LO.[Job IDFK], LO.[Room ID], LO.[Construction ID], LO.[Cabinet Count], LO.[Material ID], LO.[Door ID], LO.[Fingerpull ID], LO.[Door Qty], LO.DoorBuyOutYN, LO.[Glass Doors], LO.[Glass Shelves], LO.[Color ID], 
		LO.[Glaze ID], LO.[Interior ID], LO.[Hinge ID], LO.[Hinge Qty], LO.[Knob ID], LO.[Knob Qty], LO.[Drawer Box ID], LO.[Drawer Box Qty], LO.DrawerBoxBuyOutYN, LO.[Drawer Guide ID], LO.[Drawer Guide Qty], LO.[Drawer Front ID], 
		LO.[Pull ID], LO.[Pull Qty], LO.[Knob 2 ID], LO.[Knob 2 Qty], LO.[Pull 2 ID], LO.[Pull 2 Qty], LO.[Hardware Comments], LO.[Accessory ID]
	FROM [EXCELP&D].[dbo].[Lot Order Details] AS LO
	LEFT JOIN [EXCELP&D].[dbo].JobOptions AS JO ON LO.[Job IDFK] = JO.jobIDFK
	LEFT JOIN [EXCELP&D].[dbo].LotOptions AS LP ON LO.[Lot ID] = LP.[lotIDFK]
	WHERE (([Room ID] NOT IN ('Throughout', 'Balance of House') OR [Room ID] IS NULL) OR (([Room ID] IN ('Throughout', 'Balance of House')) AND (LP.hasThroughoutLot = 1 OR LP.lotOptionID IS NULL)))
			AND ((JO.prodReady = 1 OR LP.lotOptionID IS NULL));