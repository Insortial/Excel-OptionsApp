USE [EXCELP&D]
GO

/****** Object:  Table [dbo].[Job Info]    Script Date: 9/17/2024 3:05:43 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[JobInfo](
	[ID] [int] NOT NULL IDENTITY(1, 1),
	jobIDFK [int] NOT NULL,
	[Job Name] [nvarchar](128) NULL,
	[Job Number] [nvarchar](50) NULL,
	[Key Name] [nvarchar](50) NULL,
	[Company Logo] [varbinary](max) NULL,
	[Customer ID] [int] NULL,
	[Unit] [tinyint] NULL,
	[Stock] [bit] NULL,
	[Custom] [bit] NULL,
	[PID] [int] NULL,
	[Customer Name] [nvarchar](50) NULL,
	[Customer Address] [nvarchar](102) NULL,
	[Customer City] [nvarchar](25) NULL,
	[Customer State] [nvarchar](20) NULL,
	[Customer Zip] [nvarchar](20) NULL,
	[Customer Contact] [nvarchar](50) NULL,
	[Customer Email] [nvarchar](50) NULL,
	[Customer Fax] [nvarchar](32) NULL,
	[Customer Mobile] [nvarchar](32) NULL,
	[Customer Phone] [nvarchar](32) NULL,
	[Customer Comments] [nvarchar](max) NULL,
	[CVJFile] [nvarchar](255) NULL,
	[Measure] [datetime2](0) NULL,
	[Detail] [datetime2](0) NULL,
	[Production] [datetime2](0) NULL,
	[Delivery] [datetime2](0) NULL,
	[Deposit] [datetime2](0) NULL,
	[Install] [datetime2](0) NULL,
	[FinalPayment] [datetime2](0) NULL,
	[Series] [int] NULL,
	[CNCRunNo] [smallint] NULL,
	[ManageITJobID] [int] NULL,
	[ShipToName] [nvarchar](50) NULL,
	[ShipToAddress] [nvarchar](102) NULL,
	[ShipToCity] [nvarchar](25) NULL,
	[ShipToState] [nvarchar](20) NULL,
	[ShipToZip] [nvarchar](20) NULL,
	[ShipToContact] [nvarchar](50) NULL,
	[ShipToEmail] [nvarchar](50) NULL,
	[ShipToFax] [nvarchar](32) NULL,
	[ShipToMobile] [nvarchar](32) NULL,
	[ShipToPhone] [nvarchar](32) NULL,
	[ShipToComments] [nvarchar](max) NULL,
	[PurchaseOrder] [nvarchar](255) NULL,
	[Comment] [nvarchar](max) NULL,
	[SSMA_TimeStamp] [timestamp] NOT NULL,
	FOREIGN KEY (jobIDFK) REFERENCES [EXCELP&D].[dbo].[Jobs]([Job ID]),
 CONSTRAINT [Job Info$PrimaryKey] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Job Info] ADD  DEFAULT ((1)) FOR [ID]
GO

ALTER TABLE [dbo].[Job Info] ADD  DEFAULT ((0)) FOR [Customer ID]
GO

ALTER TABLE [dbo].[Job Info] ADD  DEFAULT ((0)) FOR [Unit]
GO

ALTER TABLE [dbo].[Job Info] ADD  DEFAULT ((0)) FOR [Stock]
GO

ALTER TABLE [dbo].[Job Info] ADD  DEFAULT ((0)) FOR [Custom]
GO

ALTER TABLE [dbo].[Job Info] ADD  DEFAULT ((0)) FOR [PID]
GO

ALTER TABLE [dbo].[Job Info] ADD  DEFAULT ((1)) FOR [Series]
GO

ALTER TABLE [dbo].[Job Info] ADD  DEFAULT ((0)) FOR [CNCRunNo]
GO

ALTER TABLE [dbo].[Job Info] ADD  DEFAULT ((0)) FOR [ManageITJobID]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Customer Address$disallow_zero_length] CHECK  ((len([Customer Address])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Customer Address$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Customer City$disallow_zero_length] CHECK  ((len([Customer City])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Customer City$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Customer Comments$disallow_zero_length] CHECK  ((len([Customer Comments])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Customer Comments$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Customer Contact$disallow_zero_length] CHECK  ((len([Customer Contact])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Customer Contact$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Customer Email$disallow_zero_length] CHECK  ((len([Customer Email])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Customer Email$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Customer Fax$disallow_zero_length] CHECK  ((len([Customer Fax])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Customer Fax$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Customer Mobile$disallow_zero_length] CHECK  ((len([Customer Mobile])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Customer Mobile$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Customer Name$disallow_zero_length] CHECK  ((len([Customer Name])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Customer Name$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Customer Phone$disallow_zero_length] CHECK  ((len([Customer Phone])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Customer Phone$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Customer State$disallow_zero_length] CHECK  ((len([Customer State])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Customer State$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Customer Zip$disallow_zero_length] CHECK  ((len([Customer Zip])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Customer Zip$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$CVJFile$disallow_zero_length] CHECK  ((len([CVJFile])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$CVJFile$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Job Name$disallow_zero_length] CHECK  ((len([Job Name])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Job Name$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Job Number$disallow_zero_length] CHECK  ((len([Job Number])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Job Number$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$Key Name$disallow_zero_length] CHECK  ((len([Key Name])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$Key Name$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$ShipToAddress$disallow_zero_length] CHECK  ((len([ShipToAddress])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$ShipToAddress$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$ShipToCity$disallow_zero_length] CHECK  ((len([ShipToCity])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$ShipToCity$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$ShipToComments$disallow_zero_length] CHECK  ((len([ShipToComments])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$ShipToComments$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$ShipToContact$disallow_zero_length] CHECK  ((len([ShipToContact])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$ShipToContact$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$ShipToEmail$disallow_zero_length] CHECK  ((len([ShipToEmail])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$ShipToEmail$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$ShipToFax$disallow_zero_length] CHECK  ((len([ShipToFax])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$ShipToFax$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$ShipToMobile$disallow_zero_length] CHECK  ((len([ShipToMobile])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$ShipToMobile$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$ShipToName$disallow_zero_length] CHECK  ((len([ShipToName])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$ShipToName$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$ShipToPhone$disallow_zero_length] CHECK  ((len([ShipToPhone])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$ShipToPhone$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$ShipToState$disallow_zero_length] CHECK  ((len([ShipToState])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$ShipToState$disallow_zero_length]
GO

ALTER TABLE [dbo].[Job Info]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Job Info$ShipToZip$disallow_zero_length] CHECK  ((len([ShipToZip])>(0)))
GO

ALTER TABLE [dbo].[Job Info] CHECK CONSTRAINT [SSMA_CC$Job Info$ShipToZip$disallow_zero_length]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Represents the Job ID # for each Job when Batching Jobs. If it is a single Job this value is 1.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ID]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The name of the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Job Name'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Job Name]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Job Name'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The number of the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Job Number'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Job Number]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Job Number'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The name burned into the security key.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Key Name'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Key Name]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Key Name'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'An image of the company logo - Currently Not Used' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Company Logo'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Company Logo]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Company Logo'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A unique ID to reference the customer - Currently Not Used' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Customer ID]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The display unit: 0 = Imperial, 1 = Metric, 2 = Centimeter' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Unit'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Unit]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Unit'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A Boolean flag set true if there are any Stock Assemblies in the Database.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Stock'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Stock]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Stock'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A Boolean flag set true if there are any Custom Assemblies in the database.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Custom'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Custom]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Custom'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Currently Not Used' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'PID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[PID]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'PID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Customer Name for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Name'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Customer Name]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Name'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Customer Address for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Address'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Customer Address]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Address'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Customer City for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer City'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Customer City]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer City'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Customer State for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer State'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Customer State]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer State'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Customer Zip for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Zip'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Customer Zip]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Zip'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Customer Contact for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Contact'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Customer Contact]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Contact'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Customer Email for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Email'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Customer Email]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Email'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Customer Fax Number for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Fax'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Customer Fax]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Fax'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Customer Mobile Phone for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Mobile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Customer Mobile]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Mobile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Customer Phone for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Phone'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Customer Phone]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Phone'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Customer Comments for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Comments'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Customer Comments]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Customer Comments'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The File Name for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'CVJFile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[CVJFile]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'CVJFile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Measure Date for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Measure'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Measure]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Measure'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Detail Date for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Detail'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Detail]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Detail'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Production Date for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Production'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Production]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Production'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Delivery Date for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Delivery'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Delivery]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Delivery'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Deposit Date for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Deposit'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Deposit]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Deposit'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Install Date for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Install'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Install]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Install'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Final Payment Date for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'FinalPayment'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[FinalPayment]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'FinalPayment'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Populated when Batching Jobs. Displays the Starting Number for the Assemblies for the associated Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Series'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Series]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Series'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The CNC Run Number for the current Job. (Not Populated until the Job is Output to CNC)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'CNCRunNo'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[CNCRunNo]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'CNCRunNo'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The current Job''s Manage-IT ID Number.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ManageITJobID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ManageITJobID]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ManageITJobID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Ship To Name for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ShipToName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Ship To Address for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToAddress'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ShipToAddress]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToAddress'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Ship To City for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToCity'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ShipToCity]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToCity'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Ship To State for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToState'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ShipToState]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToState'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Ship To Zip for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToZip'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ShipToZip]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToZip'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Ship To Contact for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToContact'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ShipToContact]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToContact'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Ship To Email for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToEmail'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ShipToEmail]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToEmail'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Ship To Fax Number for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToFax'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ShipToFax]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToFax'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Ship To Mobile Phone for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToMobile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ShipToMobile]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToMobile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Ship To Phone for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToPhone'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ShipToPhone]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToPhone'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Ship To Contact for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToComments'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[ShipToComments]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'ShipToComments'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Purchase Order Number for the current Job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'PurchaseOrder'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[PurchaseOrder]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'PurchaseOrder'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The comment for the current job.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Comment'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[Comment]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'COLUMN',@level2name=N'Comment'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info].[PrimaryKey]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info', @level2type=N'CONSTRAINT',@level2name=N'Job Info$PrimaryKey'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Job Info]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Job Info'
GO

