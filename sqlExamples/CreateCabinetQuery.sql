USE [EXCELP&D]
GO

/****** Object:  Table [dbo].[Cabinets]    Script Date: 9/17/2024 3:20:55 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Cabinets](
	[cabinetID] int IDENTITY(1,1) PRIMARY KEY,
	[Room ID] [int] NULL,
	[Wall ID] [int] NULL,
	[CV_cabinetID] [int] NULL,
	[Width] [float] NULL,
	[Width String] [nvarchar](12) NULL,
	[Height] [float] NULL,
	[Height String] [nvarchar](12) NULL,
	[Depth] [float] NULL,
	[Depth String] [nvarchar](12) NULL,
	[Cabinet Name] [nvarchar](50) NULL,
	[Image] [varbinary](max) NULL,
	[Cabinet Type] [smallint] NULL,
	[Cabinet Style] [smallint] NULL,
	[Left Scribe] [float] NULL,
	[Left Scribe String] [nvarchar](12) NULL,
	[Right Scribe] [float] NULL,
	[Right Scribe String] [nvarchar](12) NULL,
	[Left End] [nvarchar](20) NULL,
	[Right End] [nvarchar](20) NULL,
	[Back] [nvarchar](20) NULL,
	[Toe Height] [float] NULL,
	[Toe Height String] [nvarchar](12) NULL,
	[Toe Recess] [float] NULL,
	[Toe Recess String] [nvarchar](12) NULL,
	[Soffit Height] [float] NULL,
	[Soffit Height String] [nvarchar](12) NULL,
	[Elevation] [float] NULL,
	[Elevation String] [nvarchar](12) NULL,
	[Finished Area] [float] NULL,
	[Assembly Labor] [float] NULL,
	[Additional Labor] [float] NULL,
	[Cabinet Face] [int] NULL,
	[Retail] [bit] NULL,
	[Stock] [bit] NULL,
	[Openings] [tinyint] NULL,
	[CustomPrice] [money] NULL,
	[Quantity] [smallint] NULL,
	[Comment] [nvarchar](max) NULL,
	[Hinge] [nvarchar](1) NULL,
	[Description] [nvarchar](255) NULL,
	[Assembly] [nvarchar](max) NULL,
	[Catalog] [nvarchar](128) NULL,
	[CvcAsmID] [int] NULL,
	[SSMA_TimeStamp] [timestamp] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Room ID]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Wall ID]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Cabinet ID]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Width]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Height]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Depth]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Cabinet Type]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Cabinet Style]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Left Scribe]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Right Scribe]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Toe Height]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Toe Recess]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Soffit Height]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Elevation]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Finished Area]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Assembly Labor]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Additional Labor]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Cabinet Face]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Retail]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Stock]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [Openings]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [CustomPrice]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((1)) FOR [Quantity]
GO

ALTER TABLE [dbo].[Cabinets] ADD  DEFAULT ((0)) FOR [CvcAsmID]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [Cabinets$RoomsCabinets] FOREIGN KEY([Room ID])
REFERENCES [dbo].[Rooms] ([RoomNumber])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [Cabinets$RoomsCabinets]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Assembly$disallow_zero_length] CHECK  ((len([Assembly])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Assembly$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Back$disallow_zero_length] CHECK  ((len([Back])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Back$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Cabinet Name$disallow_zero_length] CHECK  ((len([Cabinet Name])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Cabinet Name$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Catalog$disallow_zero_length] CHECK  ((len([Catalog])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Catalog$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Comment$disallow_zero_length] CHECK  ((len([Comment])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Comment$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Depth String$disallow_zero_length] CHECK  ((len([Depth String])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Depth String$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Description$disallow_zero_length] CHECK  ((len([Description])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Description$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Elevation String$disallow_zero_length] CHECK  ((len([Elevation String])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Elevation String$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Height String$disallow_zero_length] CHECK  ((len([Height String])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Height String$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Hinge$disallow_zero_length] CHECK  ((len([Hinge])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Hinge$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Left End$disallow_zero_length] CHECK  ((len([Left End])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Left End$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Left Scribe String$disallow_zero_length] CHECK  ((len([Left Scribe String])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Left Scribe String$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Right End$disallow_zero_length] CHECK  ((len([Right End])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Right End$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Right Scribe String$disallow_zero_length] CHECK  ((len([Right Scribe String])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Right Scribe String$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Soffit Height String$disallow_zero_length] CHECK  ((len([Soffit Height String])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Soffit Height String$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Toe Height String$disallow_zero_length] CHECK  ((len([Toe Height String])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Toe Height String$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Toe Recess String$disallow_zero_length] CHECK  ((len([Toe Recess String])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Toe Recess String$disallow_zero_length]
GO

ALTER TABLE [dbo].[Cabinets]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Cabinets$Width String$disallow_zero_length] CHECK  ((len([Width String])>(0)))
GO

ALTER TABLE [dbo].[Cabinets] CHECK CONSTRAINT [SSMA_CC$Cabinets$Width String$disallow_zero_length]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Room Number for this Assembly.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Room ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Room ID]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Room ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Wall Number for this Assembly.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Wall ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Wall ID]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Wall ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Assembly Number.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Cabinet ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Cabinet ID]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Cabinet ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Width of the Assembly in imperial units.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Width'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Width]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Width'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The string representation of the Assembly Width in the display unit.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Width String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Width String]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Width String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Height of the Assembly in imperial units.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Height'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Height]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Height'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The string representation of the Assembly Height in the display unit.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Height String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Height String]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Height String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Depth of the Assembly in imperial units.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Depth'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Depth]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Depth'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The string representation of the Assembly Depth in the display unit.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Depth String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Depth String]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Depth String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The name/nomenclature of the Assembly.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Cabinet Name'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Cabinet Name]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Cabinet Name'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Image of the Assembly - Currently Not Used' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Image'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Image]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Image'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A numeric value indicating the type of Assembly: 1=Base, 2=Upper, 3=Tall, 4=Vanity, 5=Appliance, 6=Accessory, 7=Decorative, 8=Top, 9=Molding, 10=Wall, 11=WallFace, 12=Floor, 13=Ceiling, 14=Door' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Cabinet Type'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Cabinet Type]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Cabinet Type'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1=Standard, 2=BlindRight, 3=BlindLeft, 4=Corner45, 5=Corner90, 6=Filler, 7=Desk, 8=Hood, 9=Refer, 10=Valance, 11=UCValance, 12=ApplGarage, 13=DishWasher, 14=TrashComp, 15=Range, 16=CookTop, 17=Sink, 18=Microwave, 19=Window, 20=EntryDoor, 21=Picture' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Cabinet Style'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Cabinet Style]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Cabinet Style'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Left Scribe Width for the Assembly in imperial units.,' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Left Scribe'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Left Scribe]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Left Scribe'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The string representation of the Assembly Left Scribe Width in the display unit.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Left Scribe String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Left Scribe String]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Left Scribe String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Right Scribe Width of the Assembly in imperial units.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Right Scribe'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Right Scribe]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Right Scribe'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The string representation of the Assembly Right Scribe Width in the display unit.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Right Scribe String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Right Scribe String]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Right Scribe String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Left End type (Finished, Unfinished, Extended, etc.)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Left End'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Left End]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Left End'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Right End type (Finished, Unfinished, Extended, etc.)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Right End'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Right End]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Right End'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Back type (Finished, Unfinished).' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Back'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Back]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Back'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Toe Height of the Assembly in imperial units.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Toe Height'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Toe Height]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Toe Height'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The string representation of the Assembly Toe Height in the display unit.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Toe Height String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Toe Height String]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Toe Height String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Toe Recess of the Assembly in imperial units.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Toe Recess'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Toe Recess]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Toe Recess'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The string representation of the Assembly Toe Recess in the display unit.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Toe Recess String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Toe Recess String]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Toe Recess String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Soffit Height of the Assembly in imperial units.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Soffit Height'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Soffit Height]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Soffit Height'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The string representation of the Assembly Soffit Height in the display unit.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Soffit Height String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Soffit Height String]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Soffit Height String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Elevation of the Assembly in imperial units.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Elevation'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Elevation]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Elevation'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The string representation of the Assembly Elevation in the display unit.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Elevation String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Elevation String]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Elevation String'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The amount of exposed area for the Assembly.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Finished Area'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Finished Area]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Finished Area'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Assembly Labor associated with this Assembly.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Assembly Labor'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Assembly Labor]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Assembly Labor'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Any Additional Labor associated with the Assembly.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Additional Labor'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Additional Labor]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Additional Labor'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The square total of the Assembly''s Face.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Cabinet Face'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Cabinet Face]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Cabinet Face'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A boolean flag set true if the assembly was selected from a Retail catalog' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Retail'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Retail]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Retail'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A Boolean flag set true if the Assembly is a Stock Assembly. If true, additional information about the Assembly will be stored in the [Stock Cabinets] table.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Stock'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Stock]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Stock'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The number of Assembly Openings.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Openings'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Openings]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Openings'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Any Price attached to the Assembly. (Price field in Assembly Properties)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'CustomPrice'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[CustomPrice]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'CustomPrice'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Quantity of the Assembly.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Quantity'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Quantity]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Quantity'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Any Comment attached to the Assembly.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Comment'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Comment]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Comment'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A short string indicating the Door Hinge placement: L = Left, R = Right, T = Top, B = Bottom, N = None' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Hinge'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Hinge]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Hinge'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Description for the Assembly.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Description'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Description]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Description'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Stores Standard Assembly Data: CONM = Construction Style, LRVL = Left Reveal, TRVL = Top Reveal, BRVL = Bottom Reveal, HRVL = Horizontal Reveal, VRVL = Vertical Reveal, TOEH = Toe Height, TOER =  Toe Recess' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Assembly'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Assembly]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Assembly'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The .CVC File (Catalog) this Assembly originated from.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Catalog'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[Catalog]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'Catalog'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A reference to the [Assembly].[AssemblyID] field from this object''s .CVC file.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'CvcAsmID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[CvcAsmID]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'COLUMN',@level2name=N'CvcAsmID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Cabinets].[RoomsCabinets]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Cabinets', @level2type=N'CONSTRAINT',@level2name=N'Cabinets$RoomsCabinets'
GO


