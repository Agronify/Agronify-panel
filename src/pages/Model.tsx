import {
  Grid,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
  Container,
  Select,
  Checkbox,
  InputLabel,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MuiFileInput } from "mui-file-input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  useCreateModelMutation,
  useDeleteModelMutation,
  useGetCropsQuery,
  useGetModelsQuery,
  useLazyGetDiseasesQuery,
  useLazyGetModelClassesQuery,
  useLazyGetModelQuery,
  useUpdateModelClassMutation,
  useUpdateModelMutation,
} from "../service/api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import UploadFile from "../components/Upload";
import { ModelClass } from "../service/types";
import Swal from "sweetalert2";

export default function ModelPage() {
  const {
    data: models,
    isLoading: mLoading,
    isError: mError,
  } = useGetModelsQuery();
  const { data: crops } = useGetCropsQuery();
  const [createModel, { data: createData }] = useCreateModelMutation();
  const [updateModel, { data: updateData }] = useUpdateModelMutation();
  const [deleteModel, { data: deleteData }] = useDeleteModelMutation();

  const [alertDelete, setAlertDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(0);
  const [editId, setEditId] = React.useState(0);

  const [createOpen, setCreateOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [cropId, setCropId] = React.useState(0);
  const [file, setFile] = React.useState<File>();
  const [type, setType] = React.useState("");
  const [active, setActive] = React.useState(false);
  const [normalize, setNormalize] = React.useState(false);
  const [threshold, setThreshold] = React.useState(0);

  const [getModel, { data: selectedModel }] = useLazyGetModelQuery();
  const [
    getModelClasses,
    { data: selectedModelClasses, isLoading: selectedMCLoading },
  ] = useLazyGetModelClassesQuery();
  const [loadDiseases, { data: diseasesData }] = useLazyGetDiseasesQuery();
  const [updateModelClass, { isLoading: updateMClass }] =
    useUpdateModelClassMutation();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Model Name", width: 200 },
    {
      field: "crop",
      headerName: "Crop/Fruit",
      width: 200,
      renderCell: (params) => {
        return <>{(params.row.crop as any).name}</>;
      },
    },
    { field: "type", headerName: "Type", width: 100 },
    { field: "threshold", headerName: "Threshold %", width: 100 },
    {
      field: "normalize",
      headerName: "Use Normalize?",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Checkbox checked={params.row.normalize as boolean} disabled />
          </>
        );
      },
    },
    {
      field: "active",
      headerName: "Active",
      width: 50,
      renderCell: (params) => {
        return (
          <>
            <Checkbox checked={params.row.active as boolean} disabled />
          </>
        );
      },
    },
    {
      field: "id",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              sx={{ m: 0.5 }}
              color="warning"
              onClick={() => {
                setEditId(params.row.id as number);
                setName(params.row.name as string);
                setCropId(params.row.crop_id as number);
                setType(params.row.type as string);
                setActive(params.row.active as boolean);
                setNormalize(params.row.normalize as boolean);
                setThreshold(params.row.threshold as number);
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

  const [respUpload, setRespUpload] = React.useState<any>({ path: "" });
  const handleCreate = async () => {
    if (editId) {
      await updateModel({
        id: editId,
        name,
        crop_id: cropId,
        file: respUpload.path === "" ? undefined : respUpload.path,
        type,
        active,
        threshold,
        normalize,
      }).unwrap();
    } else {
      if (respUpload.path === "") {
        return;
      }
      await createModel({
        name,
        crop_id: cropId,
        file: respUpload.path,
        type,
        active,
        threshold,
        normalize,
      }).unwrap();
    }
    setName("");
    setCropId(0);
    setFile(undefined);
    setType("");
    setActive(false);
    setEditId(0);
    setCreateOpen(false);
  };

  const classColumns: GridColDef[] = [
    {
      field: "index",
      headerName: "Output Index",
      width: 100,
      align: "center",
      sortingOrder: ["asc"],
      sortable: false,
    },
    {
      field: "disease",
      headerName: "Disease",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <Select
            fullWidth
            onChange={(e) => {
              e.preventDefault();
              handleUpdateClass(e.target.value as number, params.row);
            }}
            value={(params.row.disease as any)?.id || 0}
          >
            <MenuItem value={0}>Healthy</MenuItem>
            {diseasesData?.map((disease) => {
              return (
                <MenuItem key={disease.id} value={disease.id}>
                  {disease.name}
                </MenuItem>
              );
            })}
          </Select>
        );
      },
    },
  ];

  const handleUpdateClass = async (
    diseaseId: number,
    modelClass: ModelClass
  ) => {
    await updateModelClass({
      modelId: selectedModel?.id as number,
      class: {
        disease_id: diseaseId,
        disease: undefined,
        index: modelClass.index,
        model_id: modelClass.model_id,
        id: modelClass.id,
      },
    }).unwrap();
    Swal.fire({
      icon: "success",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1500,
      title: "Update Success",
    });
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
                <Typography variant="h5" align="center">
                  Model List
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Button
                  variant="contained"
                  sx={{ mb: 1, background: "#1976d2 !important" }}
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => setCreateOpen(true)}
                >
                  Add Model
                </Button>
              </Grid>
            </Grid>
            <DataGrid
              rows={models || []}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              loading={mLoading}
              autoHeight
              pageSizeOptions={[5, 10]}
              rowSelection
              onRowSelectionModelChange={async (e) => {
                if (e.length > 0) {
                  await getModelClasses(e[0] as number).unwrap();
                  await loadDiseases(e[0] as number).unwrap();
                  await getModel(e[0] as number).unwrap();
                }
              }}
              getRowHeight={(params) => "auto"}
            />
          </Card>
        </Grid>
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
                <Typography variant="h5" align="center">
                  Model Class Mapping
                </Typography>
              </Grid>
            </Grid>
            <DataGrid
              rows={selectedModelClasses || []}
              columns={classColumns}
              loading={selectedMCLoading}
              autoHeight
              getRowHeight={(params) => "auto"}
              rowSelection={false}
              pagination={undefined}
              hideFooter
              disableColumnSelector
              disableColumnFilter
              disableColumnMenu
              initialState={{
                sorting: {
                  sortModel: [
                    {
                      field: "index",
                      sort: "asc",
                    },
                  ],
                },
              }}
            />
          </Card>
        </Grid>
      </Grid>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogTitle>{editId ? "Edit Model" : "Create Model"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
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
              <UploadFile
                file={file}
                setFile={setFile}
                type="images"
                setResUpload={setRespUpload}
                inputProps={{
                  accept: ".h5",
                }}
              ></UploadFile>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Select
                fullWidth
                native
                onChange={(e: any) => setType(e.target.value)}
                value={type}
              >
                <option value={0}>Select Type</option>
                <option value="disease">Disease</option>
                <option value="ripeness">Ripeness</option>
              </Select>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  id="normalize"
                  checked={normalize}
                  onChange={(e: any) => setNormalize(e.target.checked)}
                />
                <InputLabel htmlFor="normalize">Use Normalize?</InputLabel>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="threshold"
                label="threshold"
                name="threshold"
                autoComplete="threshold"
                type="number"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                onChange={(e) => setThreshold(parseInt(e.target.value))}
                value={threshold}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  id="active"
                  checked={active}
                  onChange={(e: any) => setActive(e.target.checked)}
                />
                <InputLabel htmlFor="active">Active</InputLabel>
              </Box>
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
          Are you sure to delete this model?
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
              await deleteModel(deleteId).unwrap();
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
