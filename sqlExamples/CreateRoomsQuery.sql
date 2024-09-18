USE [EXCELP&D]
GO

/****** Object:  Table [dbo].[Rooms]    Script Date: 9/17/2024 3:16:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Rooms](
	[jobinfoIDFK] [int] NULL,
	[roomID] [int] IDENTITY(1,1),
	[RoomNumber] [int] NULL,
	[RoomName] [nvarchar](50) NULL,
	[RoomDescription] [nvarchar](255) NULL,
	[Quantity] [smallint] NULL,
	[WallCount] [smallint] NULL,
	[ExtAsmFin] [nvarchar](30) NULL,
	[IntAsmFin] [nvarchar](30) NULL,
	[TopFin] [nvarchar](30) NULL,
	[SplashFin] [nvarchar](30) NULL,
	[CrownFin] [nvarchar](30) NULL,
	[LightRailFin] [nvarchar](30) NULL,
	[BaseBoardFin] [nvarchar](30) NULL,
	[ChairRailFin] [nvarchar](30) NULL,
	[CeilingFin] [nvarchar](30) NULL,
	[EDoorFin] [nvarchar](30) NULL,
	[WindowFin] [nvarchar](30) NULL,
	[CabinetConstruction] [nvarchar](50) NULL,
	[DrawerBoxConstruction] [nvarchar](50) NULL,
	[RollOutConstruction] [nvarchar](50) NULL,
	[BaseCabinetMaterials] [nvarchar](50) NULL,
	[BaseExposedCabinetMaterials] [nvarchar](50) NULL,
	[WallCabinetMaterials] [nvarchar](50) NULL,
	[WallExposedCabinetMaterials] [nvarchar](50) NULL,
	[DrawerBoxMaterials] [nvarchar](50) NULL,
	[RollOutMaterials] [nvarchar](50) NULL,
	[PullMaterials] [nvarchar](50) NULL,
	[HingeMaterials] [nvarchar](50) NULL,
	[GuideMaterials] [nvarchar](50) NULL,
	[WallDoorName] [nvarchar](50) NULL,
	[WallDoorMaterial] [nvarchar](50) NULL,
	[DrawerFrontName] [nvarchar](50) NULL,
	[DrawerFrontMaterial] [nvarchar](50) NULL,
	[BaseDoorName] [nvarchar](50) NULL,
	[BaseDoorMaterial] [nvarchar](50) NULL,
	[WallEndPanelName] [nvarchar](50) NULL,
	[WallEndPanelMaterial] [nvarchar](50) NULL,
	[BaseEndPanelName] [nvarchar](50) NULL,
	[BaseEndPanelMaterial] [nvarchar](50) NULL,
	[TallEndPanelName] [nvarchar](50) NULL,
	[TallEndPanelMaterial] [nvarchar](50) NULL,
	[ClosetAssemblyConstruction] [nvarchar](50) NULL,
	[ClosetDrawerBoxConstruction] [nvarchar](50) NULL,
	[ClosetRollOutConstruction] [nvarchar](50) NULL,
	[ClosetAssemblyMaterials] [nvarchar](50) NULL,
	[ClosetDrawerBoxMaterials] [nvarchar](50) NULL,
	[ClosetRollOutMaterials] [nvarchar](50) NULL,
	[ClosetPullMaterials] [nvarchar](50) NULL,
	[ClosetHingeMaterials] [nvarchar](50) NULL,
	[ClosetGuideMaterials] [nvarchar](50) NULL,
	[ClosetWireBasketMaterials] [nvarchar](50) NULL,
	[ClosetWallDoorName] [nvarchar](50) NULL,
	[ClosetWallDoorMaterial] [nvarchar](50) NULL,
	[ClosetDrawerFrontName] [nvarchar](50) NULL,
	[ClosetDrawerFrontMaterial] [nvarchar](50) NULL,
	[ClosetBaseDoorName] [nvarchar](50) NULL,
	[ClosetBaseDoorMaterial] [nvarchar](50) NULL,
	[ClosetWallEndPanelName] [nvarchar](50) NULL,
	[ClosetWallEndPanelMaterial] [nvarchar](50) NULL,
	[ClosetBaseEndPanelName] [nvarchar](50) NULL,
	[ClosetBaseEndPanelMaterial] [nvarchar](50) NULL,
	[ClosetTallEndPanelName] [nvarchar](50) NULL,
	[ClosetTallEndPanelMaterial] [nvarchar](50) NULL,
	[CounterTopConstruction] [nvarchar](50) NULL,
	[CounterTopMaterial] [nvarchar](50) NULL,
	[CounterTopProfile] [nvarchar](50) NULL,
	[CounterTopProfileMaterial] [nvarchar](50) NULL,
	[CrownProfile] [nvarchar](50) NULL,
	[CrownProfileMaterial] [nvarchar](50) NULL,
	[LightRailProfile] [nvarchar](50) NULL,
	[LightRailProfileMaterial] [nvarchar](50) NULL,
	[ScribeProfile] [nvarchar](50) NULL,
	[ScribeProfileMaterial] [nvarchar](50) NULL,
	[BaseBoardProfile] [nvarchar](50) NULL,
	[BaseBoardProfileMaterial] [nvarchar](50) NULL,
	[ChairRailProfile] [nvarchar](50) NULL,
	[ChairRailProfileMaterial] [nvarchar](50) NULL,
	[CasingProfile] [nvarchar](50) NULL,
	[CasingProfileMaterial] [nvarchar](50) NULL,
	[AppliedProfile] [nvarchar](50) NULL,
	[AppliedProfileMaterial] [nvarchar](50) NULL,
	[CeilingProfile] [nvarchar](50) NULL,
	[CeilingProfileMaterial] [nvarchar](50) NULL,
 CONSTRAINT [Rooms$PrimaryKey] PRIMARY KEY CLUSTERED 
(
	[roomID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Rooms] ADD  DEFAULT ((1)) FOR [Job ID]
GO

ALTER TABLE [dbo].[Rooms] ADD  DEFAULT ((1)) FOR [RoomNumber]
GO

ALTER TABLE [dbo].[Rooms] ADD  DEFAULT ((1)) FOR [Quantity]
GO

ALTER TABLE [dbo].[Rooms] ADD  DEFAULT ((0)) FOR [WallCount]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [Rooms$Job InfoRooms] FOREIGN KEY([jobinfoIDFK])
REFERENCES [dbo].[Job Info] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [Rooms$Job InfoRooms]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$BaseBoardFin$disallow_zero_length] CHECK  ((len([BaseBoardFin])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$BaseBoardFin$disallow_zero_length]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$CeilingFin$disallow_zero_length] CHECK  ((len([CeilingFin])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$CeilingFin$disallow_zero_length]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$ChairRailFin$disallow_zero_length] CHECK  ((len([ChairRailFin])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$ChairRailFin$disallow_zero_length]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$CrownFin$disallow_zero_length] CHECK  ((len([CrownFin])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$CrownFin$disallow_zero_length]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$EDoorFin$disallow_zero_length] CHECK  ((len([EDoorFin])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$EDoorFin$disallow_zero_length]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$ExtAsmFin$disallow_zero_length] CHECK  ((len([ExtAsmFin])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$ExtAsmFin$disallow_zero_length]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$IntAsmFin$disallow_zero_length] CHECK  ((len([IntAsmFin])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$IntAsmFin$disallow_zero_length]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$LightRailFin$disallow_zero_length] CHECK  ((len([LightRailFin])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$LightRailFin$disallow_zero_length]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$RoomDescription$disallow_zero_length] CHECK  ((len([RoomDescription])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$RoomDescription$disallow_zero_length]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$RoomName$disallow_zero_length] CHECK  ((len([RoomName])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$RoomName$disallow_zero_length]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$SplashFin$disallow_zero_length] CHECK  ((len([SplashFin])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$SplashFin$disallow_zero_length]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$TopFin$disallow_zero_length] CHECK  ((len([TopFin])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$TopFin$disallow_zero_length]
GO

ALTER TABLE [dbo].[Rooms]  WITH NOCHECK ADD  CONSTRAINT [SSMA_CC$Rooms$WindowFin$disallow_zero_length] CHECK  ((len([WindowFin])>(0)))
GO

ALTER TABLE [dbo].[Rooms] CHECK CONSTRAINT [SSMA_CC$Rooms$WindowFin$disallow_zero_length]
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A cross-reference to the [Job Info].[ID] for this Room.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'Job ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[Job ID]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'Job ID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'A unique number to reference this Room.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'RoomID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[RoomID]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'RoomID'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Room Number for this Room. Automatically assigned by the System based on the Order the Rooms are created.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'RoomNumber'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[RoomNumber]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'RoomNumber'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Room Name for this Room.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'RoomName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[RoomName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'RoomName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The Room Description for this Room.' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'RoomDescription'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[RoomDescription]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'RoomDescription'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Room quantity' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'Quantity'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[Quantity]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'Quantity'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Number of walls in this room' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallCount'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[WallCount]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallCount'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Default exterior assembly finish' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ExtAsmFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ExtAsmFin]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ExtAsmFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Default interior assembly finish' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'IntAsmFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[IntAsmFin]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'IntAsmFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Default countertop surface finish' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'TopFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[TopFin]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'TopFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Default splash finish' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'SplashFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[SplashFin]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'SplashFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Default crown molding finish' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CrownFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CrownFin]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CrownFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Default light rail finish' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'LightRailFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[LightRailFin]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'LightRailFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Default base board molding finish' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseBoardFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[BaseBoardFin]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseBoardFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Default chair rail molding finish' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ChairRailFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ChairRailFin]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ChairRailFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Default ceiling molding finish' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CeilingFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CeilingFin]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CeilingFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Default entry door finish' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'EDoorFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[EDoorFin]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'EDoorFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Default window finish' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WindowFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[WindowFin]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WindowFin'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Construction method for cabinet assemblies' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CabinetConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CabinetConstruction]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CabinetConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Construction method for drawer box assemblies' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'DrawerBoxConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[DrawerBoxConstruction]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'DrawerBoxConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Construction method for roll out assemblies' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'RollOutConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[RollOutConstruction]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'RollOutConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Base cabinet material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseCabinetMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[BaseCabinetMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseCabinetMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Base cabinet exposed material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseExposedCabinetMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[BaseExposedCabinetMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseExposedCabinetMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Wall cabinet material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallCabinetMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[WallCabinetMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallCabinetMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Wall cabinet exposed material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallExposedCabinetMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[WallExposedCabinetMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallExposedCabinetMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Drawer box material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'DrawerBoxMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[DrawerBoxMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'DrawerBoxMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Roll out material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'RollOutMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[RollOutMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'RollOutMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Pull material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'PullMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[PullMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'PullMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Hinge material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'HingeMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[HingeMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'HingeMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Guide material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'GuideMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[GuideMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'GuideMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Wall door name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallDoorName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[WallDoorName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallDoorName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Wall door material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallDoorMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[WallDoorMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallDoorMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Drawer front name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'DrawerFrontName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[DrawerFrontName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'DrawerFrontName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Drawer front material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'DrawerFrontMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[DrawerFrontMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'DrawerFrontMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Base door name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseDoorName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[BaseDoorName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseDoorName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Base door material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseDoorMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[BaseDoorMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseDoorMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Wall end panel name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallEndPanelName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[WallEndPanelName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallEndPanelName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Wall end panel material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallEndPanelMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[WallEndPanelMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'WallEndPanelMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Base end panel name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseEndPanelName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[BaseEndPanelName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseEndPanelName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Base end panel material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseEndPanelMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[BaseEndPanelMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseEndPanelMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Tall end panel name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'TallEndPanelName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[TallEndPanelName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'TallEndPanelName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Tall end panel material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'TallEndPanelMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[TallEndPanelMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'TallEndPanelMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Construction method for closet assemblies' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetAssemblyConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetAssemblyConstruction]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetAssemblyConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Construction method for closet drawer box assemblies' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetDrawerBoxConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetDrawerBoxConstruction]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetDrawerBoxConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Construction method for closet roll out assemblies' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetRollOutConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetRollOutConstruction]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetRollOutConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet assembly material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetAssemblyMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetAssemblyMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetAssemblyMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet drawer box material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetDrawerBoxMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetDrawerBoxMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetDrawerBoxMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet roll out material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetRollOutMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetRollOutMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetRollOutMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet pull material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetPullMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetPullMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetPullMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet hinge material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetHingeMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetHingeMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetHingeMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet guide material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetGuideMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetGuideMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetGuideMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet wire basket material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetWireBasketMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetWireBasketMaterials]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetWireBasketMaterials'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet wall door name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetWallDoorName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetWallDoorName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetWallDoorName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet wall door material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetWallDoorMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetWallDoorMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetWallDoorMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet drawer front name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetDrawerFrontName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetDrawerFrontName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetDrawerFrontName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet drawer front material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetDrawerFrontMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetDrawerFrontMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetDrawerFrontMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet base door name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetBaseDoorName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetBaseDoorName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetBaseDoorName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet base door material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetBaseDoorMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetBaseDoorMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetBaseDoorMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet wall end panel name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetWallEndPanelName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetWallEndPanelName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetWallEndPanelName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet wall end panel material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetWallEndPanelMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetWallEndPanelMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetWallEndPanelMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet base end panel name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetBaseEndPanelName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetBaseEndPanelName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetBaseEndPanelName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet base end panel material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetBaseEndPanelMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetBaseEndPanelMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetBaseEndPanelMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet tall end panel name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetTallEndPanelName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetTallEndPanelName]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetTallEndPanelName'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Closet tall end panel material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetTallEndPanelMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ClosetTallEndPanelMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ClosetTallEndPanelMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Countertop construction method' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CounterTopConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CounterTopConstruction]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CounterTopConstruction'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Countertop material schedule name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CounterTopMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CounterTopMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CounterTopMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Countertop profile name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CounterTopProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CounterTopProfile]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CounterTopProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Countertop profile material' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CounterTopProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CounterTopProfileMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CounterTopProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Crown profile name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CrownProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CrownProfile]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CrownProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Crown profile material' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CrownProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CrownProfileMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CrownProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Light rail profile name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'LightRailProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[LightRailProfile]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'LightRailProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Light rail profile material' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'LightRailProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[LightRailProfileMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'LightRailProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Scribe profile name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ScribeProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ScribeProfile]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ScribeProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Scribe profile material' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ScribeProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ScribeProfileMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ScribeProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Base board profile name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseBoardProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[BaseBoardProfile]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseBoardProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Base board profile material' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseBoardProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[BaseBoardProfileMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'BaseBoardProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Chair rail profile name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ChairRailProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ChairRailProfile]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ChairRailProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Chair rail profile material' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ChairRailProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[ChairRailProfileMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'ChairRailProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Casing profile name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CasingProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CasingProfile]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CasingProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Casing profile material' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CasingProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CasingProfileMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CasingProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Applied profile name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'AppliedProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[AppliedProfile]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'AppliedProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Applied profile material' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'AppliedProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[AppliedProfileMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'AppliedProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Ceiling profile name' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CeilingProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CeilingProfile]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CeilingProfile'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Ceiling profile material' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CeilingProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[CeilingProfileMaterial]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'COLUMN',@level2name=N'CeilingProfileMaterial'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[PrimaryKey]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'CONSTRAINT',@level2name=N'Rooms$PrimaryKey'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_SSMA_SOURCE', @value=N'report.[Rooms].[Job InfoRooms]' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Rooms', @level2type=N'CONSTRAINT',@level2name=N'Rooms$Job InfoRooms'
GO


