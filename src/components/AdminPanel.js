import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from 'react-router-dom';

function CertificateAdminPanel() {
  //   const navigate = useNavigate();
  const [tab, setTab] = useState("certifications");
  const [certifications, setCertifications] = useState([]);
  const [contacts, setContacts] = useState([]);
  // Update newCert state to use image URL
  const [newCert, setNewCert] = useState({
    title: "",
    image: "",
    details: [""],
  });
  const [editCert, setEditCert] = useState(null);
  const fileInputRef = useRef(null);
  const [newGalleryImage, setNewGalleryImage] = useState(null); // New state for gallery image
  const [galleryImages, setGalleryImages] = useState([]); // New state for gallery
    const [newImage, setNewImage] = useState('');
  const galleryFileInputRef = useRef(null); // New ref for gallery file input

  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    image: "",
    details: [""],
  });
  const [editCourse, setEditCourse] = useState(null);

  // Fetch courses
  useEffect(() => {
    // ... existing fetches ...
    axios
      .get(`${process.env.REACT_APP_API_URL}/courses`)
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // Handle course submit
  const handleCourseSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/courses`, newCourse)
      .then((response) => {
        setCourses([...courses, response.data]);
        setNewCourse({ title: "", image: "", details: [""] });
      })
      .catch((error) => console.error("Error uploading course:", error));
  };

  // Handle course edit
  const handleEditCourse = (course) => {
    setEditCourse(course);
    setNewCourse({
      title: course.title,
      image: course.image,
      details: course.details,
    });
  };

  // Handle course update
  const handleUpdateCourse = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}/courses/${editCourse._id}`, newCourse)
      .then((response) => {
        setCourses(
          courses.map((c) => (c._id === editCourse._id ? response.data : c))
        );
        setEditCourse(null);
        setNewCourse({ title: "", image: "", details: [""] });
      })
      .catch((error) => console.error("Error updating course:", error));
  };

  // Handle course delete
  const handleDeleteCourse = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/courses/${id}`)
      .then(() => setCourses(courses.filter((c) => c._id !== id)))
      .catch((error) => console.error("Error deleting course:", error));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/certifications`)
      .then((response) => setCertifications(response.data))
      .catch((error) => console.error(error));
    axios
      .get(`${process.env.REACT_APP_API_URL}/contact`)
      .then((response) => setContacts(response.data))
      .catch((error) => console.error(error));
    axios
      .get(`${process.env.REACT_APP_API_URL}/gallery`)
      .then((response) => setGalleryImages(response.data))
      .catch((error) => console.error("Error fetching gallery images:", error));
  }, []);

  // Update handleCertSubmit to send JSON instead of FormData
  const handleCertSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/certifications`, newCert)
      .then((response) => {
        setCertifications([...certifications, response.data]);
        setNewCert({ title: "", image: "", details: [""] });
      })
      .catch((error) => console.error("Error uploading certification:", error));
  };

  const handleEditCert = (cert) => {
    setEditCert(cert);
    setNewCert({ title: cert.title, image: null, details: cert.details });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Update handleUpdateCert similarly
  const handleUpdateCert = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/certifications/${editCert._id}`,
        newCert
      )
      .then((response) => {
        setCertifications(
          certifications.map((cert) =>
            cert._id === editCert._id ? response.data : cert
          )
        );
        setEditCert(null);
        setNewCert({ title: "", image: "", details: [""] });
      })
      .catch((error) => console.error("Error updating certification:", error));
  };

  const handleDeleteCert = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/certifications/${id}`)
      .then(() => setCertifications(certifications.filter((c) => c._id !== id)))
      .catch((error) => console.error(error));
  };

  const handleDeleteContact = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/contact/${id}`)
      .then(() => setContacts(contacts.filter((c) => c._id !== id)))
      .catch((error) => console.error(error));
  };

  const handleDownload = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/contact/download`;
  };

   const handleImageSubmit = (e) => {
    e.preventDefault();
    if (!newImage) return;
    axios.post(`${process.env.REACT_APP_API_URL}/gallery`, { image: newImage })
      .then(response => {
        setGalleryImages([...galleryImages, response.data]);
        setNewImage('');
      })
      .catch(error => console.error('Error adding gallery image:', error));
  };

  const handleDeleteImage = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/gallery/${id}`)
      .then(() => setGalleryImages(galleryImages.filter(img => img._id !== id)))
      .catch(error => console.error('Error deleting gallery image:', error));
  };

  //   const handleLogout = () => {
  //     // Clear any admin session data if needed
  //     localStorage.removeItem('adminToken');
  //     navigate('/admin-board');
  //   };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8"
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold gradient-text"
          >
            Admin Panel
          </motion.h2>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Logout
          </motion.button> */}
        </div>

        <div className="flex space-x-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTab("certifications")}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              tab === "certifications"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Certifications
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTab("courses")}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              tab === "courses"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Courses
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTab("contacts")}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              tab === "contacts"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Contact Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTab("gallery")}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              tab === "gallery"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Gallery
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {tab === "certifications" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold mb-6 gradient-text">
                  {editCert ? "Edit" : "Add"} Certification
                </h3>
                <form
                  onSubmit={editCert ? handleUpdateCert : handleCertSubmit}
                  className="space-y-6"
                >
                  <input
                    type="text"
                    value={newCert.title}
                    onChange={(e) =>
                      setNewCert({ ...newCert, title: e.target.value })
                    }
                    placeholder="Certification Title"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <input
                    type="text"
                    value={newCert.image}
                    onChange={(e) =>
                      setNewCert({ ...newCert, image: e.target.value })
                    }
                    placeholder="Certification Image URL"
                    className="w-full p-3 bg-indigo-700 rounded-lg text-white"
                    required
                  />
                  {newCert.details.map((detail, index) => (
                    <input
                      key={index}
                      type="text"
                      value={detail}
                      onChange={(e) => {
                        const details = [...newCert.details];
                        details[index] = e.target.value;
                        setNewCert({ ...newCert, details });
                      }}
                      placeholder={`Detail ${index + 1}`}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() =>
                      setNewCert({
                        ...newCert,
                        details: [...newCert.details, ""],
                      })
                    }
                    className="w-full px-4 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    Add Detail
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full btn-primary"
                  >
                    {editCert ? "Update" : "Add"} Certification
                  </motion.button>
                </form>
              </div>

              <div className="glass rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6 gradient-text">
                  Existing Certifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white/5 rounded-xl overflow-hidden group hover:bg-white/10 transition-all duration-300"
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h4 className="text-xl font-semibold text-white mb-4">
                          {cert.title}
                        </h4>
                        <div className="flex space-x-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEditCert(cert)}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteCert(cert._id)}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {tab === "courses" && (
            <div>
              <h3 className="text-2xl font-bold mb-4">
                {editCourse ? "Edit" : "Add"} Course
              </h3>
              <form
                onSubmit={editCourse ? handleUpdateCourse : handleCourseSubmit}
                className="space-y-6 mb-12"
              >
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  placeholder="Course Title"
                  className="w-full p-3 bg-indigo-700 rounded-lg text-white"
                  required
                />
                <input
                  type="text"
                  value={newCourse.image}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, image: e.target.value })
                  }
                  placeholder="Course Image URL"
                  className="w-full p-3 bg-indigo-700 rounded-lg text-white"
                  required
                />
                {newCourse.details.map((detail, index) => (
                  <input
                    key={index}
                    type="text"
                    value={detail}
                    onChange={(e) => {
                      const details = [...newCourse.details];
                      details[index] = e.target.value;
                      setNewCourse({ ...newCourse, details });
                    }}
                    placeholder={`Detail ${index + 1}`}
                    className="w-full p-3 bg-indigo-700 rounded-lg text-white"
                  />
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setNewCourse({
                      ...newCourse,
                      details: [...newCourse.details, ""],
                    })
                  }
                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  Add Detail
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                >
                  {editCourse ? "Update" : "Add"} Course
                </button>
              </form>
              <h3 className="text-2xl font-bold mb-4">Existing Courses</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-indigo-700 p-4 rounded-lg"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h4 className="text-xl font-semibold">{course.title}</h4>
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "contacts" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-xl p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold gradient-text">
                  Contact Details
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Download as Excel
                </motion.button>
              </div>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400">Name</p>
                        <p className="text-white font-medium">{contact.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Email</p>
                        <p className="text-white font-medium">
                          {contact.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Phone</p>
                        <p className="text-white font-medium">
                          {contact.phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Certification</p>
                        <p className="text-white font-medium">
                          {contact.certification}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-400">Message</p>
                      <p className="text-white">{contact.message}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteContact(contact._id)}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                      Delete
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {tab === "gallery" && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Add Gallery Image</h3>
             <form onSubmit={handleImageSubmit} className="space-y-6 mb-12">
            <input
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="Gallery Image URL"
              className="w-full p-3 bg-indigo-700 rounded-lg text-white"
              required
            />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                >
                  Upload Image
                </button>
              </form>
              <h3 className="text-2xl font-bold mb-4">
                Existing Gallery Images
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleryImages.map((image) => (
                  <div key={image._id} className="bg-indigo-700 p-4 rounded-lg">
                    <img
                      src={image.image}
                      alt="Gallery"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <button
                      onClick={() => handleDeleteImage(image._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default CertificateAdminPanel;
