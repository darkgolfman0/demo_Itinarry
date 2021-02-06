import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Divider, Grid, Paper, TextField, Input } from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReplyIcon from '@material-ui/icons/Reply';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from "react-router-dom";
import { detailViewStyle } from "@app/styles";
import { connect, useDispatch } from "react-redux";
import { updateConductorAction, deleteConductorAction } from "@app/actions";
import { CONDUCTOR_LIST_PATH } from '@app/constants/pathLibrary'
import RhfMasterActiveStatus from "@app/components/RhfMasterActiveStatus";
import DeleteButton from "@app/components/DeleteButton";

let schema = yup.object().shape({
    condClass: yup.string().required(),
    condDesc: yup.string().required(),
    condCont: yup.string().required(),
    gravity: yup.number().required().positive().max(99),
});

const ConductorClassDetail = (props) => {

    const classes = detailViewStyle();
    const history = useHistory();
    const discard = useDispatch();

    const formCode = 'frm4100';
    const formName = 'Conductor Class';
    const pageLevel = 'Detail';
    
    const methods = useForm({
        resolver: yupResolver(schema),
    });
    const { register, errors, handleSubmit } = methods

    const rowData = props.location.state ? props.location.state : { condClass: "", condDesc: "", condCont: "", gravity: null, active: "1", insert: true };
    const isEdit = props.location.state ? true : false;

    const handleDiscard = () => {
        history.push(`/${CONDUCTOR_LIST_PATH}`);
    }

    const handleDelete = () => {
        discard(deleteConductorAction(rowData));
    }

    const doSubmit =  (data) => {
        discard(updateConductorAction(data));
    };

    return (
        <div className={classes.root}>
            <h3>{`${formName} (${formCode})`} - {pageLevel}</h3>
            <Paper className={classes.paper}>
                <Grid container spacing={1}>
                    <FormProvider {...methods}>
                        <form className={classes.form} noValidate onSubmit={handleSubmit((data) => doSubmit(data))}>
                        <Input name="insert" type="hidden" inputRef={register()} defaultValue={rowData.insert || false} />
                            <Grid item xs={12}>
                                <TextField name="condClass" label="Conductor Class" inputRef={register()} defaultValue={rowData.condClass} className={classes.textField} inputProps={{maxLength: 5, readOnly: isEdit}} />
                                <Box fontSize={14} color="red">{errors.condClass && errors.condClass.message}</Box>
                            </Grid>
                            <Box width={1} mb={2} />
                            <Grid item xs={12}>
                                <TextField name="condDesc" label="Conductor Description" inputRef={register({ required: true, maxLength: 30 })} defaultValue={rowData.condDesc} className={classes.textField} inputProps={{maxLength: 30}} />
                                <Box fontSize={14} color="red">{errors.condDesc && errors.condDesc.message}</Box>
                            </Grid>
                            <Box width={1} mb={2} />
                            <Grid item xs={12}>
                                <TextField name="condCont" label="Conductor Content" inputRef={register({ required: true, maxLength: 30 })} defaultValue={rowData.condCont} className={classes.textField} inputProps={{maxLength: 30}}/>
                                <Box fontSize={14} color="red">{errors.condCont && errors.condCont.message}</Box>
                            </Grid>
                            <Box width={1} mb={2} />
                            <Grid item xs={12}>
                                <TextField name="gravity" type="number" label="Gravity (KG/cm³)" inputRef={register({ required: true, min: 0, max: 1 })} defaultValue={rowData.gravity} className={classes.textField} />
                                <Box fontSize={14} color="red">{errors.gravity && errors.gravity.message}</Box>
                            </Grid>
                            <Box width={1} mb={2} />
                            <Grid item xs={12}>
                                <TextField name="remark" label="Remark" inputRef={register()} defaultValue={rowData.remark} className={classes.textField} />
                            </Grid>
                            <Box width={1} mb={2} />
                            <Grid item xs={12}>
                                <RhfMasterActiveStatus name="active" defaultValue={rowData.active} />
                            </Grid>
                            <Box width={1} mb={2} />
                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs>
                                        <Button type="button" variant="outlined" size="small" color="secondary" className={classes.submit} startIcon={<ReplyIcon />}  onClick={handleDiscard}>discard</Button>
                                    </Grid>
                                    <Grid item>
                                        {isEdit &&
                                            <DeleteButton mr={1} onDelete={handleDelete}/>
                                        }
                                        <Button type="submit" variant="contained" size="small" color="primary" className={classes.submit} startIcon={<SaveIcon />}>SAVE</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </FormProvider>
                </Grid>
            </Paper>
        </div>
    );
}

export default ConductorClassDetail;