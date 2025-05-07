import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert, TextField, Pagination } from '@mui/material';
import Cookies from 'js-cookie';
import Navbar from '../../../../layout/Navbar';
import Footer from '../../../../layout/Footer';
import apiService from '../../../../../services/ZooZoneAPIService';
import { AuthContext } from '../../../../../context/AuthContext';
import EditProductModal from './EditProductModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import CreateProductModal from './CreateProductModal';
import { LanguageContext } from '../../../../../context/AppContext';
import Translations from '../../../../../lang/SupplierDashBoard.json';
import { CustomTextField } from '../../../../../context/theme';

const ProductsDashboard = () => {
  const { userData } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterName, setFilterName] = useState('');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterStock, setFilterStock] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get('token');
        const productsData = await apiService.getSupplierProducts(token);
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error fetching supplier products:", error);
      }
    };

    if (userData) {
      fetchProducts();
    }
  }, [userData]);

  const applyFilters = () => {
    let filtered = products;
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.Category_EN === filterCategory);
    }
    if (filterName) {
      filtered = filtered.filter(product => product.Name_EN.toLowerCase().includes(filterName.toLowerCase()));
    }
    if (filterPrice !== 'all') {
      filtered = filtered.filter(product => filterPrice === 'low' ? product.Price < 50 : product.Price >= 50);
    }
    if (filterStock !== 'all') {
      filtered = filtered.filter(product => filterStock === 'low' ? product.stock < 50 : product.stock >= 50);
    }
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filterCategory, filterName, filterPrice, filterStock]);

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (product) => {
    setCurrentProduct(product);
    setOpenDeleteModal(true);
  };

  const handleCreateProduct = () => {
    setOpenCreateModal(true);
  };

  const handleSaveNewProduct = async () => {
    setOpenCreateModal(false);
    const token = Cookies.get('token');
    const productsData = await apiService.getSupplierProducts(token);
    setProducts(productsData);
    setFilteredProducts(productsData);
  };

  const handleUpdateNewProduct = async (updatedProduct) => {
    setOpenEditModal(false); 
    const token = Cookies.get('token'); 

    await apiService.updateProduct(token, updatedProduct);

    const productsData = await apiService.getSupplierProducts(token);
    setProducts(productsData);
    setFilteredProducts(productsData);
  };

  const handleDeleteProduct = async () => {
    try {
      const token = Cookies.get('token');
      await apiService.deleteProduct(token, currentProduct._id);
      setProducts(products.filter(product => product._id !== currentProduct._id));
      const productsData = await apiService.getSupplierProducts(token);
      setProducts(productsData);
      setFilteredProducts(productsData);

      setSnackbarMessage('Product deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setOpenDeleteModal(false);

    } catch (error) {
      console.error("Error deleting product:", error);
      setSnackbarMessage('Failed to delete product');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const getLocalizedText = (product, field) => {
    return product[`${field}_${language}`] || product[`${field}_EN`];
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ flex: 1 }}>
        <TableContainer component={Paper} sx={{ maxWidth: "80%", margin: "auto", mt: 5 }}>
          <Typography variant="h4" component="h2" sx={{ textAlign: "center", my: 3, fontWeight: "bold" }}>
            {Translations.products_dashboard.title[language]}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCreateProduct}
            >
              {Translations.products_dashboard.create_new_product[language]}
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <FormControl sx={{ mr: 2 }}>
              <InputLabel>{Translations.products_dashboard.category[language]}</InputLabel>
              <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <MenuItem value="all">{Translations.products_dashboard.all[language]}</MenuItem>
                <MenuItem value="Cat Accessories">Cat Accessories</MenuItem>
                <MenuItem value="Dog Grooming">Dog Grooming</MenuItem>
                <MenuItem value="Bird Accessories">Bird Accessories</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label={Translations.products_dashboard.product_name[language]}
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              sx={{ mr: 2 }}
            />
            <FormControl sx={{ mr: 2 }}>
              <InputLabel>{Translations.products_dashboard.price[language]}</InputLabel>
              <Select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
                <MenuItem value="all">{Translations.products_dashboard.all[language]}</MenuItem>
                <MenuItem value="low">{Translations.products_dashboard.low_price[language]}</MenuItem>
                <MenuItem value="high">{Translations.products_dashboard.high_price[language]}</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>{Translations.products_dashboard.stock[language]}</InputLabel>
              <Select value={filterStock} onChange={(e) => setFilterStock(e.target.value)}>
                <MenuItem value="all">{Translations.products_dashboard.all[language]}</MenuItem>
                <MenuItem value="low">{Translations.products_dashboard.low_stock[language]}</MenuItem>
                <MenuItem value="high">{Translations.products_dashboard.high_stock[language]}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Table aria-label="products table">
            <TableHead sx={{ backgroundColor: '#83c388 ' }}>
              <TableRow>
                <TableCell align="center" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  {Translations.products_dashboard.product_name[language]}
                </TableCell>
                <TableCell align="center" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  {Translations.products_dashboard.description[language]}
                </TableCell>
                <TableCell align="center" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  {Translations.products_dashboard.category[language]}
                </TableCell>
                <TableCell align="center" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  {Translations.products_dashboard.price[language]}
                </TableCell>
                <TableCell align="center" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  {Translations.products_dashboard.stock[language]}
                </TableCell>
                <TableCell align="center" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  {Translations.products_dashboard.actions[language]}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: '#eaeaea' }}>
              {currentProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell align="center">{getLocalizedText(product, 'Name')}</TableCell>
                  <TableCell align="center">{getLocalizedText(product, 'Description')}</TableCell>
                  <TableCell align="center">{getLocalizedText(product, 'Category')}</TableCell>
                  <TableCell align="center">${product.Price}</TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" onClick={() => handleEditClick(product)}>
                      {Translations.products_dashboard.edit[language]}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(product)} sx={{ ml: 2 }}>
                      {Translations.products_dashboard.delete[language]}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={Math.ceil(filteredProducts.length / productsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </TableContainer>

        {/* Modals */}
        {currentProduct && (
          <>
            <EditProductModal
              open={openEditModal}
              onClose={() => setOpenEditModal(false)}
              product={currentProduct}
              onSave={handleUpdateNewProduct}
            />
            <DeleteConfirmationModal
              open={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              onDelete={handleDeleteProduct}
              product={currentProduct}
            />
          </>
        )}
        <CreateProductModal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          onSave={handleSaveNewProduct}
          onCreate={handleSaveNewProduct}
        />

        {/* Snackbar for success/error messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductsDashboard;
