USE [EXCELP&D]
GO
/****** Object:  Table [dbo].[JobOptions]    Script Date: 9/19/2024 3:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobOptions](
	[jobOptionID] [int] IDENTITY(1,1) NOT NULL,
	[jobIDFK] [int] NOT NULL,
	[jobNotes] [varchar](max) NULL,
	[phaseDate] [date] NULL,
	[prodReady] [bit] NOT NULL,
	[phone] [varchar](30) NULL,
	[superintendent] [varchar](50) NULL,
	[optionCoordinator] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[jobOptionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[jobIDFK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LotOptions]    Script Date: 9/19/2024 3:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LotOptions](
	[lotOptionID] [int] IDENTITY(1,1) NOT NULL,
	[jobOptionIDFK] [int] NOT NULL,
	[lotIDFK] [int] NULL,
	[upperHeight] [varchar](50) NULL,
	[islands] [varchar](50) NULL,
	[crown] [varchar](50) NULL,
	[lightRail] [varchar](50) NULL,
	[baseShoe] [varchar](50) NULL,
	[recyclingBins] [varchar](50) NULL,
	[supports] [varchar](50) NULL,
	[lotNotes] [varchar](max) NULL,
	[lotOptionsValue] [float] NULL,
	[appliances] [varchar](max) NULL,
	[kitchen] [varchar](50) NULL,
	[hasThroughoutLot] [bit] NOT NULL,
	[masterBath] [varchar](50) NULL,
	[bath2] [varchar](50) NULL,
	[bath3] [varchar](50) NULL,
	[bath4] [varchar](50) NULL,
	[powder] [varchar](50) NULL,
	[laundry] [varchar](50) NULL,
	[lotFooterNotes] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[lotOptionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[prodreadylotsview]    Script Date: 9/19/2024 3:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--DROP VIEW prodreadylotsview

CREATE VIEW [dbo].[prodreadylotsview] AS
SELECT LO.[Lot ID], LO.[Job IDFK], LO.[Room ID], LO.[Construction ID], LO.[Cabinet Count], LO.[Material ID], LO.[Door ID], LO.[Fingerpull ID], LO.[Door Qty], LO.DoorBuyOutYN, LO.[Glass Doors], LO.[Glass Shelves], LO.[Color ID], 
		LO.[Glaze ID], LO.[Interior ID], LO.[Hinge ID], LO.[Hinge Qty], LO.[Knob ID], LO.[Knob Qty], LO.[Drawer Box ID], LO.[Drawer Box Qty], LO.DrawerBoxBuyOutYN, LO.[Drawer Guide ID], LO.[Drawer Guide Qty], LO.[Drawer Front ID], 
		LO.[Pull ID], LO.[Pull Qty], LO.[Knob 2 ID], LO.[Knob 2 Qty], LO.[Pull 2 ID], LO.[Pull 2 Qty], LO.[Hardware Comments], LO.[Accessory ID]
	FROM [EXCELP&D].[dbo].[Lot Order Details] AS LO
	LEFT JOIN [EXCELP&D].[dbo].JobOptions AS JO ON LO.[Job IDFK] = JO.jobIDFK
	LEFT JOIN [EXCELP&D].[dbo].LotOptions AS LP ON LO.[Lot ID] = LP.lotIDFK
	WHERE (([Room ID] NOT IN ('Throughout', 'Balance of House') OR [Room ID] IS NULL) OR (([Room ID] IN ('Throughout', 'Balance of House')) AND (LP.hasThroughoutLot = 1 OR LP.lotOptionID IS NULL)))
		AND ((JO.prodReady = 1 OR LP.lotOptionID IS NULL));
GO
/****** Object:  Table [dbo].[LotOptionToPackage]    Script Date: 9/19/2024 3:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LotOptionToPackage](
	[lotOptionIDFK] [int] NOT NULL,
	[packageIDFK] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[lotOptionIDFK] ASC,
	[packageIDFK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Packages]    Script Date: 9/19/2024 3:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Packages](
	[packageID] [int] IDENTITY(1,1) NOT NULL,
	[builderIDFK] [int] NOT NULL,
	[packageName] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[packageID] ASC,
	[builderIDFK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[packageName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[packageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PackageToProject]    Script Date: 9/19/2024 3:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PackageToProject](
	[packageIDFK] [int] NOT NULL,
	[projectIDFK] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[packageIDFK] ASC,
	[projectIDFK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RefreshTokens]    Script Date: 9/19/2024 3:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefreshTokens](
	[userIDFK] [int] NOT NULL,
	[token] [varchar](500) NULL,
	[dateCreated] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 9/19/2024 3:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[roleID] [int] IDENTITY(1,1) NOT NULL,
	[roleName] [varchar](50) NULL,
	[roleDescription] [varchar](250) NULL,
PRIMARY KEY CLUSTERED 
(
	[roleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 9/19/2024 3:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[userID] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](100) NULL,
	[firstName] [varchar](100) NULL,
	[lastName] [varchar](100) NULL,
	[password] [varchar](100) NULL,
	[phone] [varchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[userID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [unique_emails] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersToRoles]    Script Date: 9/19/2024 3:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersToRoles](
	[roleIDFK] [int] NOT NULL,
	[userIDFK] [int] NOT NULL,
	[assignmentDate] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[roleIDFK] ASC,
	[userIDFK] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[RefreshTokens] ADD  DEFAULT (getdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[UsersToRoles] ADD  DEFAULT (getdate()) FOR [assignmentDate]
GO
ALTER TABLE [dbo].[JobOptions]  WITH CHECK ADD FOREIGN KEY([jobIDFK])
REFERENCES [dbo].[Jobs] ([Job ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LotOptions]  WITH CHECK ADD FOREIGN KEY([jobOptionIDFK])
REFERENCES [dbo].[JobOptions] ([jobOptionID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LotOptions]  WITH CHECK ADD FOREIGN KEY([lotIDFK])
REFERENCES [dbo].[Lots] ([Lot ID])
GO
ALTER TABLE [dbo].[LotOptionToPackage]  WITH CHECK ADD FOREIGN KEY([lotOptionIDFK])
REFERENCES [dbo].[LotOptions] ([lotOptionID])
GO
ALTER TABLE [dbo].[LotOptionToPackage]  WITH CHECK ADD FOREIGN KEY([packageIDFK])
REFERENCES [dbo].[Packages] ([packageID])
GO
ALTER TABLE [dbo].[Packages]  WITH CHECK ADD FOREIGN KEY([builderIDFK])
REFERENCES [dbo].[Customers] ([Customer ID])
GO
ALTER TABLE [dbo].[PackageToProject]  WITH CHECK ADD FOREIGN KEY([packageIDFK])
REFERENCES [dbo].[Packages] ([packageID])
GO
ALTER TABLE [dbo].[PackageToProject]  WITH CHECK ADD FOREIGN KEY([projectIDFK])
REFERENCES [dbo].[Projects] ([Project ID])
GO
ALTER TABLE [dbo].[RefreshTokens]  WITH CHECK ADD FOREIGN KEY([userIDFK])
REFERENCES [dbo].[Users] ([userID])
GO
ALTER TABLE [dbo].[UsersToRoles]  WITH CHECK ADD FOREIGN KEY([roleIDFK])
REFERENCES [dbo].[Roles] ([roleID])
GO
ALTER TABLE [dbo].[UsersToRoles]  WITH CHECK ADD FOREIGN KEY([userIDFK])
REFERENCES [dbo].[Users] ([userID])
GO
/****** Object:  StoredProcedure [dbo].[delete_job_option]    Script Date: 9/19/2024 3:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[delete_job_option]
	(@jobOptionID int)
AS
BEGIN
	DECLARE @jobID int;

	SELECT @jobID = jobIDFK
	FROM JobOptions
	WHERE jobOptionID = @jobOptionID;

	DELETE FROM [Lot Order Details] WHERE [Job IDFK] = @jobID;
	DELETE FROM LotOptions WHERE jobOptionIDFK = @jobOptionID;
	DELETE FROM JobOptions WHERE jobOptionID = @jobOptionID;
END
GO
/****** Object:  StoredProcedure [dbo].[delete_package]    Script Date: 9/19/2024 3:45:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[delete_package]
	(@packageID int)
AS
BEGIN
	DECLARE @lotIDS TABLE (
		lotID int
	)

	INSERT INTO @lotIDS (lotID)
		SELECT LO.lotIDFK 
		FROM LotOptionToPackage AS LP
		INNER JOIN LotOptions AS LO ON LP.lotOptionIDFK = LO.lotOptionID
		WHERE packageIDFK = @packageID;

	DELETE FROM [Lot Order Details] WHERE [Lot ID] IN (SELECT * FROM @lotIDS);
	DELETE FROM [LotOptionToPackage] WHERE packageIDFK = @packageID;
	DELETE FROM [LotOptions] WHERE lotIDFK IN (SELECT * FROM @lotIDS);
	DELETE FROM [PackageToProject] where packageIDFK = @packageID;
	DELETE FROM [Packages] WHERE packageID = @packageID;
END
GO
