import React, { useState, useEffect } from "react";
import { Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TablePagination, TableRow
    ,Modal, Button, Typography } from "@mui/material";
import { call } from "../service/ApiService";

const Muitable = () => {
    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'username', name: 'username' },
        { id: 'apiKey', name: 'apiKey' },
        { id: 'createdDate', name: 'createdDate' },
    ]

    const handlechangepage = (event, newpage) => {
        pagechange(newpage)
    }
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value)
        pagechange(0);
    }

    const [rows, rowchange] = useState([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(20);
    useEffect(() => {
        call("/api/db/characters", "GET", null).then((response) => {
            rowchange(response);
            console.log(response);
        });
      }, []);


    // 모달 열기/닫기 상태 관리
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    // 모달 열기 함수
    const openContentModal = (title, content) => {
        setModalTitle(title);
        setModalContent(content);
        setOpenModal(true);
    };

    // 모달 닫기 함수
    const closeContentModal = () => {
        setOpenModal(false);
        setModalTitle("");
        setModalContent("");
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Paper sx={{ width: '90%', marginLeft: '5%', marginTop: '1%' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>{column.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows && rows
                                .slice(page * rowperpage, page * rowperpage + rowperpage)
                                .map((row) => {
                                    return (
                                        <TableRow key={row.id}>
                                            {columns && columns.map((column, i) => {
                                                let value = row[column.id];
                                                return (
                                                    <TableCell key={column.id}>
                                                        {value.length > 20 ? (
                                                            <>
                                                                {value.substring(0, 20)}{" "}
                                                                <Button onClick={() => openContentModal(column.name, value)}>더보기</Button>
                                                            </>
                                                        ) : (
                                                            value
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[20, 40, 60]}
                    rowsPerPage={rowperpage}
                    page={page}
                    count={rows.length}
                    component="div"
                    onPageChange={handlechangepage}
                    onRowsPerPageChange={handleRowsPerPage}

                >
                </TablePagination>
            </Paper>

            {/* 모달 */}
            <Modal
                open={openModal}
                onClose={closeContentModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div style={{ 
                    position: "absolute", 
                    top: "50%", left: "50%", 
                    transform: "translate(-50%, -50%)", 
                    backgroundColor: "white", 
                    padding: "20px", width: "400px", overflowY: "auto" }}>
                    <Typography variant="h6" id="modal-title">
                        {modalTitle}
                    </Typography>
                    <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                        {modalContent}
                    </pre>
                </div>
            </Modal>

        </div>
    );
}

export default Muitable;