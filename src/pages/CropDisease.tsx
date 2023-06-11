import {
  Grid,
  Paper,
  Container,
  Card,
  Button,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  useGetCropsQuery,
  useGetDiseasesQuery,
  useGetDiseaseQuery,
  useCreateDiseaseMutation,
  useUpdateDiseaseMutation,
  useDeleteDiseaseMutation,
} from "../service/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import { MuiFileInput } from "mui-file-input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UploadFile from "../components/Upload";
export default function CropDiseasePage() {
  const {
    data: diseases,
    isLoading: dsLoading,
    isError: dsError,
  } = useGetDiseasesQuery();

  const [alertDelete, setAlertDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);
  const [editId, setEditId] = React.useState(0);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "crop",
      headerName: "Crop/Fruit",
      width: 200,
      renderCell: (params) => {
        return <>{(params.row.crop as any).name}</>;
      },
    },
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
                setCropId(params.row.crop_id as number);
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
  const { data: crops } = useGetCropsQuery();
  const [createDisease, { data: createData }] = useCreateDiseaseMutation();
  const [updateDisease, { data: updateData }] = useUpdateDiseaseMutation();
  const [deleteDisease, { data: deleteData }] = useDeleteDiseaseMutation();
  const [createOpen, setCreateOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [cropId, setCropId] = React.useState(0);
  const [image, setImage] = React.useState<File>();
  const [type, setType] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [respUpload, setRespUpload] = React.useState<any>({ path: "" });
  const handleCreate = async () => {
    if (editId) {
      await updateDisease({
        id: editId,
        name,
        crop_id: cropId,
        image: respUpload.path === "" ? undefined : respUpload.path,
        type,
        description,
      }).unwrap();
    } else {
      if (respUpload.path === "") {
        return;
      }
      await createDisease({
        name,
        crop_id: cropId,
        image: respUpload.path,
        type,
        description,
      }).unwrap();
    }
    setName("");
    setCropId(0);
    setImage(undefined);
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
                  Add Disease
                </Button>
              </Grid>
            </Grid>
            <DataGrid
              rows={diseases || []}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              loading={dsLoading}
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
              <Select
                fullWidth
                native
                onChange={(e: any) => setCropId(e.target.value)}
                value={cropId}
              >
                <option value={0}>Select Crop/Fruit</option>
                {crops?.map((crop) => (
                  <option key={crop.id} value={crop.id}>
                    {crop.name}
                  </option>
                ))}
              </Select>
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
              <UploadFile
                file={image}
                setFile={setImage}
                type="images"
                setResUpload={setRespUpload}
              ></UploadFile>
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
              await deleteDisease(deleteId).unwrap();
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
