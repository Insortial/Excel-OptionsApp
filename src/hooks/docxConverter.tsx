import { Document, Packer, Paragraph, TextRun, PageBreak, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, VerticalAlign, Footer } from "docx";
import { LotTableInterface, PartOfLot, JobDetails } from "../../../types/LotTableInterface";
import { saveAs } from "file-saver";


export default function docxConverter(jobDetails:JobDetails, lotCollection: LotTableInterface[], name:string, phone:string, email:string) {
    console.log(jobDetails)
    console.log(lotCollection)
    
    const readNewLine = (inputString:string | undefined):TextRun[] => {
        inputString = inputString ?? ""
        return inputString.split("\n").map(line=>new TextRun({break:1,text:line}))
    }
    const jobDetailsTable = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text: "Builder",
                            alignment: AlignmentType.CENTER
                        })],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: "Project",
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: "Phase",
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: "Superintendent",
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: "Phone No.",
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: "Area Foreman",
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({
                            text: jobDetails.builder,
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: jobDetails.project,
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: jobDetails.phase,
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: jobDetails.superintendent ?? "",
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: jobDetails.phone ?? "",
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: jobDetails.foreman,
                            alignment: AlignmentType.CENTER
                        })],
                    }),
                ],
            }),
        ],
        alignment: AlignmentType.CENTER,
        width: {
            size: 10000,
            type: WidthType.DXA
        }
    })

    const createLotDetailsTable = (selectedLot: LotTableInterface) => {
        return new Table({
            columnWidths: [3500, 3500],
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Job ID",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: jobDetails.jobID.toString(),
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Box Style",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.boxStyle ?? "",
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Drawer Fronts",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.partsOfLot[0].drawerFronts ?? "",
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Drawer Boxes",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.partsOfLot[0].drawerBoxes ?? "",
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Drawer Guides",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.partsOfLot[0].drawerGuides ?? "",
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Door Hinges",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.partsOfLot[0].doorHinges ?? "",
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Interiors",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.interiors ?? "",
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Upper Height",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.upperHeight ?? "",
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Islands",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.islands ?? "",
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Crown",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.crown ?? "",
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Light Rail",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.lightRail ?? "",
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Base Shoe",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.baseShoe ?? "",
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Recycling Bins",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.recyclingBins ?? "",
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Job Specific Notes",
                                alignment: AlignmentType.CENTER,
                            })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({
                                children: readNewLine(jobDetails.jobNotes),
                                alignment: AlignmentType.CENTER
                            })],
                        })
                    ],
                }),
            ],
            alignment: AlignmentType.CENTER,
            width: {
                size: 7000,
                type: WidthType.DXA
            }
        })
    }

    const outputOptionCellInfo = (partOfLot:PartOfLot) => {
        let optionCellInfo = []
        const hardwareLine = [new TextRun({
            text: partOfLot.doors !== "" ? `Doors: ${partOfLot.doors} ${partOfLot.fingerpull}` : ""
        }),
        new TextRun({
            text: partOfLot.pulls !== "" ? `Pulls: ${partOfLot.pulls}` : "",
            break: partOfLot.doors !== "" ? 1 : 0
        }),
        new TextRun({
            break: partOfLot.doors === "" && partOfLot.pulls === "" ? 0 : 1
        })]

        optionCellInfo = [...hardwareLine, ...readNewLine(partOfLot.details), 
        ...readNewLine(partOfLot.appliances)]

        return optionCellInfo
    }

    const generateOptionsSectionRows = (selectedLot:LotTableInterface) => {
        const optionSectionRows = []
        const partsOfLotLength = selectedLot.partsOfLot.length
        for(const [index, lotSection] of selectedLot.partsOfLot.entries()) {
            let tableChildren = [new TableCell({
                children: [new Paragraph({
                    text: lotSection.material !== "" ? `${lotSection.material} / ${lotSection.color}` : "",
                    alignment: AlignmentType.CENTER
                })],
                width: { size: 15, type: WidthType.PERCENTAGE },
            }),
            new TableCell({
                children: [new Paragraph({
                    text: lotSection.roomID ?? "",
                    alignment: AlignmentType.CENTER
                })],
                width: { size: 15, type: WidthType.PERCENTAGE },
            }),
            new TableCell({
                children: [new Paragraph({children: outputOptionCellInfo(lotSection)})],
                width: { size: 40, type: WidthType.PERCENTAGE },
            }),
        ]

            if(index == 0) {
                tableChildren = [ 
                    new TableCell({
                        children: [new Paragraph({
                            text: selectedLot.lot ?? "",
                            alignment: AlignmentType.CENTER
                        })],
                        width: { size: 5, type: WidthType.PERCENTAGE },
                        rowSpan: partsOfLotLength
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            text: selectedLot.plan ?? "",
                            alignment: AlignmentType.CENTER
                        })],
                        width: { size: 5, type: WidthType.PERCENTAGE },
                        rowSpan: partsOfLotLength
                    }),
                    ...tableChildren,
                    new TableCell({
                        children: [new Paragraph("")],
                        width: { size: 5, type: WidthType.PERCENTAGE },
                        rowSpan: partsOfLotLength
                    }),
                    new TableCell({
                        children: [new Paragraph({
                            children: readNewLine(selectedLot.lotNotes),
                            alignment: AlignmentType.CENTER
                        })],
                        width: { size: 15, type: WidthType.PERCENTAGE },
                        rowSpan: partsOfLotLength
                    }),]
            }
            optionSectionRows.push(new TableRow({
                children: tableChildren
            }))
        }
        return optionSectionRows
    }


    const createOptionsInfoTable = (selectedLot:LotTableInterface) => {
        return new Table({
            columnWidths: [1000, 1000, 1000, 5000, 1000, 1000],
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                children: readNewLine("LOT\n"),
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: readNewLine("PLAN\n"),
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: readNewLine("Material/Color\n"),
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: readNewLine("Part of Room\n"),
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: readNewLine("Option\n"),
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: readNewLine("Option PO\n"),
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: readNewLine("Notes:\n"),
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                    ],
                }),
                ...generateOptionsSectionRows(selectedLot)
            ],
            alignment: AlignmentType.CENTER,
            width: {
                size: 11000,
                type: WidthType.DXA
            },
        })
    }

    const createlotFooterTable = (selectedLot:LotTableInterface) => {
        return new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: "Lot",
                                alignment: AlignmentType.CENTER
                            })],
                            verticalAlign: VerticalAlign.CENTER,
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: "Kitchen",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: "Master",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: "Bath 2",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: "Bath 3",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: "Bath 4",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: "Powder",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: "Laundry",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: "Notes",
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.lot,
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.kitchen,
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.master,
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.bath2,
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.bath3,
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.bath4,
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.powder,
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                text: selectedLot.laundry,
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: readNewLine(selectedLot.footerNotes),
                                alignment: AlignmentType.CENTER
                            })],
                        }),
                    ],
                }),
            ],
            alignment: AlignmentType.CENTER,
            width: {
                size: 10000,
                type: WidthType.DXA
            }
        })
    }


    const pageTitle = new Paragraph({
        children: [new TextRun({
            text: `APPROVED PRODUCTION SCHEDULE ${jobDetails.date}`,
            bold: true,
            color: "000000",
        }),
        new TextRun({
            text: "",
            break: 1
        })],
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_1,
    })

    const lineBreak = new Paragraph({
        children: [
        new TextRun({
            text: "",
            break: 2
        })],
    })

    const pageBreak = new Paragraph({
        children: [new PageBreak()],
    })

    const iterateOverTables = () => {
        const newArray = []
        for (let lotIndex = 0; lotIndex < lotCollection.length; lotIndex++) {
            newArray.push(pageTitle)
            newArray.push(jobDetailsTable)
            newArray.push(lineBreak)
            newArray.push(createLotDetailsTable(lotCollection[lotIndex]))
            newArray.push(lineBreak)
            newArray.push(createOptionsInfoTable(lotCollection[lotIndex]))
            newArray.push(lineBreak)
            newArray.push(createlotFooterTable(lotCollection[lotIndex]))
            if(lotIndex < lotCollection.length - 1)
                newArray.push(pageBreak)
        }
        return newArray
    }
    
    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: {
                        size: "10pt",
                        font: "Arial",
                        color: "000000",
                    },
                },
            },
        },
        sections: [
            {
                properties: {},
                children: iterateOverTables(),
                footers: {
                    default: new Footer({
                        children: [new Paragraph({
                            children : [new TextRun({text: name, break: 1}), 
                                        new TextRun({text: '\nOptions Coordinator', break: 1}), 
                                        new TextRun({text: '\n225 Jason Court, Corona CA 92879', break: 1}),
                                        new TextRun({text: '\nOffice (951) 279-4545 Ext 215', break: 1}), 
                                        new TextRun({text: '\nFax (951) 279-4544', break: 1})],
                            alignment: AlignmentType.CENTER
                        })]
                    }) 
                }
            },
        ],
    });
    
    // Used to export the file into a .docx file
    Packer.toBlob(doc).then((blob) => {
       saveAs(blob, `${jobDetails.builder} ${jobDetails.project} ${jobDetails.date}.docx`)
    }); 
}

