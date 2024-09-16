SELECT table_name [Table Name], column_name [Column Name]
FROM information_schema.columns where data_type = 'datetime2'

-- For the Jobs table
ALTER TABLE [EXCELP&D].[dbo].[Jobs]
ALTER COLUMN [Measured Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Jobs]
ALTER COLUMN [Copies Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Jobs]
ALTER COLUMN [Options Approval Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Jobs]
ALTER COLUMN [Buyout Doors Scheduled Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Jobs]
ALTER COLUMN [Buyout Doors Actual Date] DATE;

-- For the Lots table
ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Date Delivery Scheduled] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Scheduled Production Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Date Ordered] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Customer Desired Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Scheduled Delivery Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Options Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Disclosed Prod Deliv Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Rescheduled Deliv Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Rescheduled Deliv Date 2] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Rescheduled Deliv Date 3] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Shop ETA] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Date Production Began] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Date Production Completed] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Date Loaded] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Actual Delivery Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Finaled Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Buyout Doors Scheduled Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Buyout Doors Actual Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [Installation Date] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [QC Walk Date Due] DATE;

ALTER TABLE [EXCELP&D].[dbo].[Lots]
ALTER COLUMN [QC Walk Report Received] DATE;

-- For the tbl48HRInstallQCR_ImportTMP table
ALTER TABLE [EXCELP&D].[dbo].[tbl48HRInstallQCR_ImportTMP]
ALTER COLUMN FormStarted DATE;

ALTER TABLE [EXCELP&D].[dbo].[tbl48HRInstallQCR_ImportTMP]
ALTER COLUMN FormSubmitted DATE;

-- For the tblJobWorkOrder table
ALTER TABLE [EXCELP&D].[dbo].[tblJobWorkOrder]
ALTER COLUMN DateOrdered DATE;

ALTER TABLE [EXCELP&D].[dbo].[tblJobWorkOrder]
ALTER COLUMN DateCompleted DATE;

-- For the tblLotCSDetails table
ALTER TABLE [EXCELP&D].[dbo].[tblLotCSDetails]
ALTER COLUMN TripBackDate DATE;

-- For the tblLotCSDetails_OLD_2015-08-04 table
ALTER TABLE [EXCELP&D].[dbo].[tblLotCSDetails OLD 2015-08-04]
ALTER COLUMN TripBackDate DATE;