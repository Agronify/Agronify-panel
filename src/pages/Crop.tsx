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
  useGetCropsQuery,
  useCreateCropMutation,
  useUploadFileMutation,
  useDeleteCropMutation,
  useUpdateCropMutation,
} from "../service/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import { MuiFileInput } from "mui-file-input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function CropPage() {
  const {
    data: crops,
    isLoading: ksLoading,
    isError: ksError,
  } = useGetCropsQuery();

  const [alertDelete, setAlertDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);
  const [editId, setEditId] = React.useState(0);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "type",
      headerName: "Type",
      width: 200,
    },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        return (
          <img
            src={
              "https://storage.googleapis.com/agronify_bucket/" +
              params.row.image
            }
            alt="image"
            className="h-full w-full object-cover"
          />
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
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
              color="warning"
              onClick={() => {
                setEditId(params.row.id as number);
                setName(params.row.title as string);
                setType(params.row.content as string);
                setDescription(params.row.content as string);
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
  const [createCrop, { data: createData }] = useCreateCropMutation();
  const [updateCrop, { data: updateData }] = useUpdateCropMutation();
  const [deleteCrop, { data: deleteData }] = useDeleteCropMutation();
  const [createOpen, setCreateOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const [type, setType] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleCreate = async () => {
    let respUpload = { path: "" };
    if (image) {
      respUpload = await uploadFile({
        file: image as File,
        type: "images",
      }).unwrap();
    }
    if (editId) {
      await updateCrop({
        id: editId,
        name,
        image: respUpload.path === "" ? undefined : respUpload.path,
        type,
        description,
        is_fruit: false,
      }).unwrap();
    } else {
      if (respUpload.path === "") {
        return;
      }
      await createCrop({
        name,
        image: respUpload.path,
        type,
        description,
        is_fruit: false,
      }).unwrap();
    }
    setName("");
    setImage(null);
    setType("");
    setDescription("");
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
                  Add Crop
                </Button>
              </Grid>
            </Grid>
            <DataGrid
              rows={crops || []}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              loading={ksLoading}
              autoHeight
              pageSizeOptions={[5, 10]}
              rowSelection={false}
              getRowHeight={(params) => "auto"}
            />
          </Card>
        </Grid>
      </Grid>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogTitle>{editId ? "Edit Crop" : "Create Crop"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={(e: any) => setName(e.target.value)}
                value={name}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="type"
                label="Type"
                name="type"
                autoComplete="type"
                onChange={(e: any) => setType(e.target.value)}
                value={type}
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
                multiline
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="Description"
                onChange={(e: any) => setDescription(e.target.value)}
                value={description}
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
          Are you sure to delete this crop?
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
              await deleteCrop(deleteId).unwrap();
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
