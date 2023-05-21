import {
  Grid,
  Paper,
  Container,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  useGetKnowledgesQuery,
  useCreateKnowledgeMutation,
  useUploadFileMutation,
  useDeleteKnowledgeMutation,
  useUpdateKnowledgeMutation,
} from "../service/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import { MuiFileInput } from "mui-file-input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function KnowledgePage() {
  const {
    data: knowledges,
    isLoading: ksLoading,
    isError: ksError,
  } = useGetKnowledgesQuery();

  const [alertDelete, setAlertDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);
  const [editId, setEditId] = React.useState(0);

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    {
      field: "tags",
      headerName: "Tags",
      width: 200,
      renderCell: (params) => {
        return (params.row.tags as string[]).map((tag) => {
          return <Card sx={{ p: 1, m: 0.5 }}>{tag}</Card>;
        });
      },
    },
    {
      field: "id",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              sx={{ m: 0.5 }}
              onClick={() => {
                console.log("params", params);
              }}
            >
              <VisibilityIcon />
            </Button>
            <Button
              variant="contained"
              sx={{ m: 0.5 }}
              color="warning"
              onClick={() => {
                setEditId(params.row.id as number);
                setTitle(params.row.title as string);
                setTags((params.row.tags as string[]).join(","));
                setContent(params.row.content as string);
                setCreateOpen(true);
              }}
            >
              <EditIcon />
            </Button>
            <Button
              variant="contained"
              sx={{ m: 0.5 }}
              color="error"
              onClick={async () => {
                setDeleteId(params.row.id as number);
                setAlertDelete(true);
              }}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const [uploadFile, { data: uploadData }] = useUploadFileMutation();
  const [createKnowledge, { data: createData }] = useCreateKnowledgeMutation();
  const [updateKnowledge, { data: updateData }] = useUpdateKnowledgeMutation();
  const [deleteKnowledge, { data: deleteData }] = useDeleteKnowledgeMutation();
  const [createOpen, setCreateOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const [tags, setTags] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleCreate = async () => {
    let respUpload = { path: "" };
    if (image) {
      respUpload = await uploadFile({
        file: image as File,
        type: "images",
      }).unwrap();
    }
    if (editId) {
      await updateKnowledge({
        id: editId,
        title,
        image: respUpload.path === "" ? undefined : respUpload.path,
        tags: tags.split(","),
        content,
      }).unwrap();
    } else {
      if (respUpload.path === "") {
        return;
      }
      await createKnowledge({
        title,
        image: respUpload.path,
        tags: tags.split(","),
        content,
      }).unwrap();
    }
    setTitle("");
    setImage(null);
    setTags("");
    setContent("");
    setEditId(0);
    setCreateOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Card
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Button
                  variant="contained"
                  sx={{ mb: 1, background: "#1976d2 !important" }}
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => setCreateOpen(true)}
                >
                  Add Knowledge
                </Button>
              </Grid>
            </Grid>
            <DataGrid
              rows={knowledges || []}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              loading={ksLoading}
              pageSizeOptions={[5, 10]}
              rowSelection={false}
            />
          </Card>
        </Grid>
      </Grid>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogTitle>
          {editId ? "Edit Knowledge" : "Create Knowledge"}
          Knowledge
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                onChange={(e: any) => setTitle(e.target.value)}
                value={title}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <MuiFileInput
                required
                sx={{
                  width: "100%",
                }}
                value={image}
                placeholder="Upload Image"
                onChange={(e) => setImage(e)}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="tags"
                label="Tags"
                name="tags"
                autoComplete="tags"
                onChange={(e: any) => setTags(e.target.value)}
                value={tags}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                multiline
                margin="normal"
                required
                fullWidth
                id="content"
                label="Content"
                name="content"
                autoComplete="content"
                onChange={(e: any) => setContent(e.target.value)}
                value={content}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Button
                variant="contained"
                sx={{ mb: 1, background: "#1976d2 !important" }}
                onClick={() => {
                  handleCreate();
                }}
              >
                {editId ? "Edit" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        open={alertDelete}
        onClose={() => setAlertDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this knowledge?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertDelete(false)} autoFocus>
            No
          </Button>
          <Button
            onClick={async () => {
              await deleteKnowledge(deleteId).unwrap();
              setAlertDelete(false);
            }}
            color="error"
          >
            Yes, Delete it!
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
