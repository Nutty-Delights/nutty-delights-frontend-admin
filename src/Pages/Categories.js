import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategory, getAllCategories, getCategories, getCategoriesError, getCategoriesLoading, updateCategory } from '../Redux/slices/categories';
import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, TextField, Typography, LinearProgress } from '@mui/material';
import Refresh from '@mui/icons-material/Loop';

const Categories = () => {

    // async function fetchCategories() {
    //     const res = await CategoryDataService.getAllCategories();
    //     console.log(res);
    // }

    useEffect(() => {

        console.log("inside admin")
        dispatch(getAllCategories());
        // setSelectedCategory(categories[0]);
        // console.log(selectedCategory);
    }, []);

    const dispatch = useDispatch();
    const categories = useSelector(getCategories);
    const isLoading = useSelector(getCategoriesLoading);
    const isError = useSelector(getCategoriesError);
    const [selected, setSelected] = useState(-1);
    const [selectedCategory, setSelectedCategory] = useState({
        categoryId: '#1',
        categoryName: "name",
        categoryImageUrl: "imageUrl",
        categoryType: "type"
    });
    const [addCategory, setAddCategory] = useState({
        categoryName: "name",
        categoryImageUrl: "imageUrl",
        categoryType: "type"
    });

    //functions to handle update category
    const handleUpdatedNameChange = (e) => {
        // console.log(e.target.value)
        setSelectedCategory((prev) => ({
            ...prev,
            categoryName: e.target.value
        }))
    }
    const handleUpdatedTypeChange = (e) => {
        // console.log(e.target.value)
        setSelectedCategory((prev) => ({
            ...prev,
            categoryType: e.target.value
        }))
    }
    const handleUpdatedImageChange = (e) => {
        // console.log(e.target.value)
        setSelectedCategory((prev) => ({
            ...prev,
            categoryImageUrl: e.target.value
        }))
    }
    const handleCategory = (e, index, category) => {
        setSelected(index);
        setSelectedCategory(category);
    }

    const handleUpdateCategory = async (id) => {
        // console.log(selectedCategory);
        const data = {
            categoryName: selectedCategory.categoryName,
            categoryImageUrl: selectedCategory.categoryImageUrl,
            categoryType: selectedCategory.categoryType
        }
        dispatch(updateCategory({ id, data }));


    }

    //functions to handle add category
    const handleAddNameChange = (e) => {
        // console.log(e.target.value)
        setAddCategory((prev) => ({
            ...prev,
            categoryName: e.target.value
        }))
    }
    const handleAddTypeChange = (e) => {
        // console.log(e.target.value)
        setAddCategory((prev) => ({
            ...prev,
            categoryType: e.target.value
        }))
    }
    const handleAddImageChange = (e) => {
        // console.log(e.target.value)
        setAddCategory((prev) => ({
            ...prev,
            categoryImageUrl: e.target.value
        }))
    }

    const handleAddCategory = async () => {
        console.log(addCategory);
        const data = {
            categoryName: addCategory.categoryName,
            categoryImageUrl: addCategory.categoryImageUrl,
            categoryType: addCategory.categoryType
        }
        dispatch(createCategory(data));


    }

    //function to delete the category
    const handleDeleteCategory = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        var result = confirm(`Confirm to delete ${selectedCategory.categoryName}?`);

        if (result) {
            dispatch(deleteCategory(id))
        }

    }

    const handleRefresh = () => {
        dispatch(getAllCategories());
    }

    return (
        <div>
            {
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    margin: '10px',
                    "&::-webkit-scrollbar": {
                        width: 20
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "orange"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "red",
                        borderRadius: 2
                    }
                }}>

                    <Box sx={{ width: '96vw' }}>

                        <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                            <Paper variant='outlined' sx={{ background: '#202526', borderColor: '#ffffff26' }}>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ margin: '18px', fontWeight: 'bold', color: 'orange' }}>{`Categories | Total : ${categories?.length}`}</Typography>
                                    <IconButton onClick={handleRefresh}>
                                        <Refresh sx={{ color: 'white' }} />
                                    </IconButton>
                                </Box>
                                <Divider sx={{ color: '#ffffff59', borderColor: '#ffffff26', margin: '5px' }}></Divider>
                                <List
                                    sx={{
                                        width: {
                                            xs: '40vw',
                                            sm: '40vw',
                                            md: '25vw'
                                        },
                                        height: '65vh',
                                        overflow: 'auto',
                                        "&::-webkit-scrollbar": {
                                            width: 3
                                        },
                                        "&::-webkit-scrollbar-track": {
                                            backgroundColor: "black"
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            backgroundColor: "grey",
                                            borderRadius: 10
                                        }
                                    }}>


                                    {
                                        isLoading ? <LinearProgress></LinearProgress> :
                                            categories?.map((item, i) => (
                                                <ListItem key={item?.categoryId} disablePadding >
                                                    <ListItemButton disableRipple onClick={(e) => { handleCategory(e, i, item) }} sx={{ backgroundColor: selected === i ? '#ffffff1f' : '#20256' }} >
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ width: 56, height: 56, margin: '10px' }} alt="Remy Sharp" src={item.categoryImageUrl} />
                                                        </ListItemAvatar>
                                                        <ListItemText secondaryTypographyProps={{
                                                            style: {
                                                                color: selected === i ? 'orange' : 'white'
                                                            }
                                                        }} sx={{ color: selected === i ? 'orange' : 'white' }} primary={` ${item?.categoryName}`} secondary={`type: ${item.categoryType}`} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                    }
                                </List>
                            </Paper>
                            <Box sx={{
                                display: {
                                    xs: 'block',
                                    sm: 'block',
                                    md: 'flex'
                                },
                                width: {
                                    xs: '40vw',
                                    sm: '50vw',
                                    md: '70vw'
                                },
                                gap: '20px'
                            }}>
                                <Paper variant='outlined' sx={{ height: '75vh', width: '40vw', padding: '15px', color: 'white', background: '#202526', borderColor: '#ffffff26' }}>
                                    <Typography sx={{ marginInline: '15px', fontWeight: 'bold', color: 'orange' }}>{"Update Category"}</Typography>
                                    <Divider sx={{ borderColor: '#ffffff26', marginBlock: '20px' }}></Divider>
                                    <Box sx={{ gap: '10px', color: 'white' }}>
                                        <TextField
                                            sx={{
                                                marginBlock: '10px',
                                                color: 'white',
                                                '& label.Mui-focused': {
                                                    color: 'orange',
                                                },
                                                '& label': {
                                                    color: 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    // borderWidth: '0.5px',
                                                    '& fieldset': {
                                                        borderColor: '#ffffff59',
                                                        // borderWidth: '0.5px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'white',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'orange',
                                                    },
                                                },
                                            }}
                                            onChange={handleUpdatedNameChange}
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Name"
                                            // defaultValue={"name"}
                                            value={selectedCategory?.categoryName}
                                        />
                                        <TextField
                                            onChange={handleUpdatedTypeChange}
                                            sx={{
                                                marginBlock: '10px',
                                                color: 'white',
                                                '& label.Mui-focused': {
                                                    color: 'orange',
                                                },
                                                '& label': {
                                                    color: 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    // borderWidth: '0.5px',
                                                    '& fieldset': {
                                                        borderColor: '#ffffff59',
                                                        // borderWidth: '0.5px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'white',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'orange',
                                                    },
                                                },
                                            }}
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Type"
                                            // defaultValue={"type"}
                                            value={selectedCategory?.categoryType}
                                        />
                                        <TextField
                                            onChange={handleUpdatedImageChange}
                                            sx={{
                                                marginBlock: '10px',
                                                color: 'white',
                                                '& label.Mui-focused': {
                                                    color: 'orange',
                                                },
                                                '& label': {
                                                    color: 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    // borderWidth: '0.5px',
                                                    '& fieldset': {
                                                        borderColor: '#ffffff59',
                                                        // borderWidth: '0.5px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'white',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'orange',
                                                    },
                                                },
                                            }}
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Image Url"
                                            // defaultValue={"value"}
                                            value={selectedCategory?.categoryImageUrl}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'start', gap: '20px', marginBlock: '50px' }}>
                                        <Button onClick={() => { handleDeleteCategory(selectedCategory.categoryId) }} sx={{
                                            background: 'red', ':hover': {
                                                background: 'red'
                                            }
                                        }} variant='contained'>Delete</Button>
                                        <Button onClick={() => { handleUpdateCategory(selectedCategory.categoryId) }} sx={{
                                            background: 'orange', ':hover': {
                                                background: 'orange'
                                            }
                                        }} variant='contained'>Update </Button>
                                    </Box>
                                </Paper>

                                <Paper variant='outlined' sx={{ height: '75vh', width: '40vw', padding: '15px', color: 'white', background: '#202526', borderColor: '#ffffff26' }}>
                                    <Typography sx={{ fontWeight: 'bold', marginInline: '15px', color: 'orange' }}>{"Add Category"}</Typography>
                                    <Divider sx={{ borderColor: '#ffffff26', marginBlock: '20px' }}></Divider>
                                    <Box sx={{ gap: '10px' }}>
                                        <TextField
                                            onChange={handleAddNameChange}
                                            sx={{
                                                marginBlock: '10px',
                                                color: 'white',
                                                '& label.Mui-focused': {
                                                    color: 'orange',
                                                },
                                                '& label': {
                                                    color: 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    // borderWidth: '0.5px',
                                                    '& fieldset': {
                                                        borderColor: '#ffffff59',
                                                        // borderWidth: '0.5px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'white',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'orange',
                                                    },
                                                },
                                            }}
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Name"
                                            value={addCategory.categoryName}
                                        // defaultValue="Category"
                                        />
                                        <TextField
                                            onChange={handleAddTypeChange}
                                            sx={{
                                                marginBlock: '10px',
                                                color: 'white',
                                                '& label.Mui-focused': {
                                                    color: 'orange',
                                                },
                                                '& label': {
                                                    color: 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    // borderWidth: '0.5px',
                                                    '& fieldset': {
                                                        borderColor: '#ffffff59',
                                                        // borderWidth: '0.5px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'white',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'orange',
                                                    },
                                                },
                                            }}
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            label="Type"
                                            value={addCategory.categoryType}
                                        // defaultValue="Nuts"
                                        />
                                        <TextField
                                            onChange={handleAddImageChange}
                                            sx={{
                                                marginBlock: '10px',
                                                color: 'white',
                                                '& label.Mui-focused': {
                                                    color: 'orange',
                                                },
                                                '& label': {
                                                    color: 'white',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    // borderWidth: '0.5px',
                                                    '& fieldset': {
                                                        borderColor: '#ffffff59',
                                                        // borderWidth: '0.5px',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'white',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'orange',
                                                    },
                                                },
                                            }}
                                            fullWidth
                                            required
                                            value={addCategory.categoryImageUrl}
                                            id="outlined-required"
                                            label="Image Url"
                                        // defaultValue="image url"
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'start', marginBlock: '50px' }}>
                                        <Button onClick={handleAddCategory} sx={{
                                            background: 'orange', ':hover': {
                                                background: 'orange'
                                            }
                                        }} variant='contained'>Add Category</Button>
                                    </Box>
                                </Paper>
                            </Box>

                        </Box>
                    </Box>

                </Box>
            }

        </div >
    )
}

export default Categories
