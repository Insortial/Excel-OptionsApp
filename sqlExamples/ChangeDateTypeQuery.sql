SELECT table_name [Table Name], column_name [Column Name]
FROM information_schema.columns where data_type = 'datetime2'

-- For the Jobs table
ALTER TABLE Jobs
ALTER COLUMN [Measured Date] DATE;

ALTER TABLE Jobs
ALTER COLUMN [Copies Date] DATE;

ALTER TABLE Jobs
ALTER COLUMN [Options Approval Date] DATE;

ALTER TABLE Jobs
ALTER COLUMN [Buyout Doors Scheduled Date] DATE;

ALTER TABLE Jobs
ALTER COLUMN [Buyout Doors Actual Date] DATE;

-- For the Lots table
ALTER TABLE Lots
ALTER COLUMN [Date Delivery Scheduled] DATE;

ALTER TABLE Lots
ALTER COLUMN [Scheduled Production Date] DATE;

ALTER TABLE Lots
ALTER COLUMN [Date Ordered] DATE;

ALTER TABLE Lots
ALTER COLUMN [Customer Desired Date] DATE;

ALTER TABLE Lots
ALTER COLUMN [Scheduled Delivery Date] DATE;

ALTER TABLE Lots
ALTER COLUMN [Options Date] DATE;

ALTER TABLE Lots
ALTER COLUMN [Disclosed Prod Deliv Date] DATE;

ALTER TABLE Lots
ALTER COLUMN [Rescheduled Deliv Date] DATE;

ALTER TABLE Lots
ALTER COLUMN [Rescheduled Deliv Date 2] DATE;

ALTER TABLE Lots
ALTER COLUMN [Rescheduled Deliv Date 3] DATE;

ALTER TABLE Lots
ALTER COLUMN [Shop ETA] DATE;

ALTER TABLE Lots
ALTER COLUMN [Date Production Began] DATE;

ALTER TABLE Lots
ALTER COLUMN [Date Production Completed] DATE;

ALTER TABLE Lots
ALTER COLUMN [Date Loaded] DATE;

ALTER TABLE Lots
ALTER COLUMN [Actual Delivery Date] DATE;

ALTER TABLE Lots
ALTER COLUMN [Finaled Date] DATE;

ALTER TABLE Lots
ALTER COLUMN [Buyout Doors Scheduled Date] DATE;

ALTER TABLE Lots
ALTER COLUMN [Buyout Doors Actual Date] DATE;

ALTER TABLE Lots
ALTER COLUMN [Installation Date] DATE;

ALTER TABLE Lots
ALTER COLUMN [QC Walk Date Due] DATE;

ALTER TABLE Lots
ALTER COLUMN [QC Walk Report Received] DATE;

-- For the tbl48HRInstallQCR_ImportTMP table
ALTER TABLE tbl48HRInstallQCR_ImportTMP
ALTER COLUMN FormStarted DATE;

ALTER TABLE tbl48HRInstallQCR_ImportTMP
ALTER COLUMN FormSubmitted DATE;

-- For the tblJobWorkOrder table
ALTER TABLE tblJobWorkOrder
ALTER COLUMN DateOrdered DATE;

ALTER TABLE tblJobWorkOrder
ALTER COLUMN DateCompleted DATE;

-- For the tblLotCSDetails table
ALTER TABLE tblLotCSDetails
ALTER COLUMN TripBackDate DATE;

-- For the tblLotCSDetails_OLD_2015-08-04 table
ALTER TABLE [tblLotCSDetails OLD 2015-08-04]
ALTER COLUMN TripBackDate DATE;