// import { useState, useRef } from "react";
// import ListDropDown from "../../components/productLists/ListDropDown";
// import CardContainer from "../../components/ui/CardContainer";
// import { useApi } from "../../context/ApiContext";
// import { useProductListData } from "../../hooks/productList/useProductListData";

// const ProductLists = () => {
//   const api = useApi();
//   const { skills, projectCategories, services, industries } =
//     useProductListData(api);

//   // Refs for dialogs
//   const skillDialogRef = useRef<HTMLDialogElement>(null);
//   const serviceDialogRef = useRef<HTMLDialogElement>(null);
//   const categoryDialogRef = useRef<HTMLDialogElement>(null);
//   const industryDialogRef = useRef<HTMLDialogElement>(null);

//   // State for new items
//   const [newSkill, setNewSkill] = useState("");
//   const [newService, setNewService] = useState("");
//   const [newCategory, setNewCategory] = useState("");
//   const [newIndustry, setNewIndustry] = useState("");

//   // Fetch data
//   const skillsQuery = skills.get();
//   const servicesQuery = services.get();
//   const categoriesQuery = projectCategories.get();
//   const industriesQuery = industries.get();

  

//   // Handler for adding new skill
//   const handleAddSkill = () => {
//     if (newSkill.trim()) {
//       skills.add.mutate({ label: newSkill });
//       setNewSkill("");
//       skillDialogRef.current?.close();
//     }
//   };

//   // Handler for adding new service
//   const handleAddService = () => {
//     if (newService.trim()) {
//       services.add.mutate({ label: newService });
//       setNewService("");
//       serviceDialogRef.current?.close();
//     }
//   };

//   // Handler for adding new category
//   const handleAddCategory = () => {
//     if (newCategory.trim()) {
//       projectCategories.add.mutate({ label: newCategory });
//       setNewCategory("");
//       categoryDialogRef.current?.close();
//     }
//   };

//   // Handler for adding new industry
//   const handleAddIndustry = () => {
//     if (newIndustry.trim()) {
//       industries.add.mutate({ label: newIndustry });
//       setNewIndustry("");
//       industryDialogRef.current?.close();
//     }
//   };

//   // handler for delete skill
//   const handleDeleteSkill = () => {

//   }

//   return (
//     <main className="w-full p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="font-semibold text-2xl">Product Lists</h1>
//         <button className="font-semibold text-white bg-gradient-to-r from-primary to-secondary px-6 py-2 rounded-lg">
//           Create +
//         </button>
//       </div>

//       <CardContainer className="min-h-screen p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Skills List */}
//           <ListDropDown
//             name="Skill List"
//             items={
//               skillsQuery.data?.data.map((skill) => ({
//                 ...skill,
//                 name: skill.label,
//               })) || []
//             }
//             buttonText="Add Skill"
//             onAdd={() => skillDialogRef.current?.showModal()}
//             onDelete={(id) => skills.delete.mutate(id)}
//           />

//           {/* Services List */}
//           <ListDropDown
//             name="Company Services"
//             items={
//               servicesQuery.data?.data.map((service) => ({
//                 ...service,
//                 name: service.label,
//               })) || []
//             }
//             buttonText="Add Service"
//             onAdd={() => serviceDialogRef.current?.showModal()}
//             onDelete={(id) => services.delete.mutate(id)}
//           />

//           {/* Project Categories */}
//           <ListDropDown
//             name="Project Category"
//             items={
//               categoriesQuery.data?.data.map((category) => ({
//                 ...category,
//                 name: category.label,
//               })) || []
//             }
//             buttonText="Add Category"
//             onAdd={() => categoryDialogRef.current?.showModal()}
//             onDelete={(id) => projectCategories.delete.mutate(id)}
//           />

//           {/* Industries List */}
//           <ListDropDown
//             name="Industry List"
           
//             items={
//               industriesQuery.data?.data.map((industry) => ({
//                 ...industry,
//                 name: industry.label,
//               })) || []
//             }
//             buttonText="Add Industry"
//             onAdd={() => industryDialogRef.current?.showModal()}
//             onDelete={(id) => industries.delete.mutate(id)}
//           />
//         </div>
//       </CardContainer>

//       {/* Modals for adding new items */}
//       {/* Add Skill Modal */}
//       <dialog ref={skillDialogRef} className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Add New Skill</h3>
//           <div className="py-4">
//             <input
//               type="text"
//               value={newSkill}
//               onChange={(e) => setNewSkill(e.target.value)}
//               placeholder="Skill name"
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div className="modal-action">
//             <button
//               className="btn btn-ghost"
//               onClick={() => skillDialogRef.current?.close()}
//             >
//               Cancel
//             </button>
//             <button
//               className="btn btn-primary"
//               onClick={handleAddSkill}
//               disabled={skills.add.isPending}
//             >
//               {skills.add.isPending ? "Adding..." : "Add Skill"}
//             </button>
//           </div>
//         </div>
//       </dialog>

//       {/* Add Service Modal */}
//       <dialog ref={serviceDialogRef} className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Add New Service</h3>
//           <div className="py-4">
//             <input
//               type="text"
//               value={newService}
//               onChange={(e) => setNewService(e.target.value)}
//               placeholder="Service name"
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div className="modal-action">
//             <button
//               className="btn btn-ghost"
//               onClick={() => serviceDialogRef.current?.close()}
//             >
//               Cancel
//             </button>
//             <button
//               className="btn btn-primary"
//               onClick={handleAddService}
//               disabled={services.add.isPending}
//             >
//               {services.add.isPending ? "Adding..." : "Add Service"}
//             </button>
//           </div>
//         </div>
//       </dialog>

//       {/* Add Category Modal */}
//       <dialog ref={categoryDialogRef} className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Add Project Category</h3>
//           <div className="py-4">
//             <input
//               type="text"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               placeholder="Category name"
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div className="modal-action">
//             <button
//               className="btn btn-ghost"
//               onClick={() => categoryDialogRef.current?.close()}
//             >
//               Cancel
//             </button>
//             <button
//               className="btn btn-primary"
//               onClick={handleAddCategory}
//               disabled={projectCategories.add.isPending}
//             >
//               {projectCategories.add.isPending ? "Adding..." : "Add Category"}
//             </button>
//           </div>
//         </div>
//       </dialog>

//       {/* Add Industry Modal */}
//       <dialog ref={industryDialogRef} className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Add Industry</h3>
//           <div className="py-4">
//             <input
//               type="text"
//               value={newIndustry}
//               onChange={(e) => setNewIndustry(e.target.value)}
//               placeholder="Industry name"
//               className="input input-bordered w-full"
//             />
//           </div>
//           <div className="modal-action">
//             <button
//               className="btn btn-ghost"
//               onClick={() => industryDialogRef.current?.close()}
//             >
//               Cancel
//             </button>
//             <button
//               className="btn btn-primary"
//               onClick={handleAddIndustry}
//               disabled={industries.add.isPending}
//             >
//               {industries.add.isPending ? "Adding..." : "Add Industry"}
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </main>
//   );
// };

// export default ProductLists;


import { useState, useRef } from "react";
import ListDropDown from "../../components/productLists/ListDropDown";
import CardContainer from "../../components/ui/CardContainer";
import { useApi } from "../../context/ApiContext";
import { useProductListData } from "../../hooks/productList/useProductListData";
import { useToast } from "@chakra-ui/react"; // Import Chakra UI toast

const ProductLists = () => {
  const api = useApi();
  const { skills, projectCategories, services, industries } =
    useProductListData(api);
  const toast = useToast(); // Initialize toast

  // Refs for dialogs
  const skillDialogRef = useRef<HTMLDialogElement>(null);
  const serviceDialogRef = useRef<HTMLDialogElement>(null);
  const categoryDialogRef = useRef<HTMLDialogElement>(null);
  const industryDialogRef = useRef<HTMLDialogElement>(null);

  // State for new items
  const [newSkill, setNewSkill] = useState("");
  const [newService, setNewService] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newIndustry, setNewIndustry] = useState("");

  // Fetch data
  const skillsQuery = skills.get();
  const servicesQuery = services.get();
  const categoriesQuery = projectCategories.get();
  const industriesQuery = industries.get();

  // Handler for adding new skill
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      skills.add.mutate(
        { label: newSkill },
        {
          onSuccess: () => {
            toast({
              title: "Skill added successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setNewSkill("");
            skillDialogRef.current?.close();
          },
          onError: (error) => {
            toast({
              title: "Error adding skill",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          },
        }
      );
    }
  };

  // Handler for adding new service
  const handleAddService = () => {
    if (newService.trim()) {
      services.add.mutate(
        { label: newService },
        {
          onSuccess: () => {
            toast({
              title: "Service added successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setNewService("");
            serviceDialogRef.current?.close();
          },
          onError: (error) => {
            toast({
              title: "Error adding service",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          },
        }
      );
    }
  };

  // Handler for adding new category
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      projectCategories.add.mutate(
        { label: newCategory },
        {
          onSuccess: () => {
            toast({
              title: "Category added successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setNewCategory("");
            categoryDialogRef.current?.close();
          },
          onError: (error) => {
            toast({
              title: "Error adding category",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          },
        }
      );
    }
  };

  // Handler for adding new industry
  const handleAddIndustry = () => {
    if (newIndustry.trim()) {
      industries.add.mutate(
        { label: newIndustry },
        {
          onSuccess: () => {
            toast({
              title: "Industry added successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setNewIndustry("");
            industryDialogRef.current?.close();
          },
          onError: (error) => {
            toast({
              title: "Error adding industry",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          },
        }
      );
    }
  };

  // Handler for deleting skill
  const handleDeleteSkill = (id: string) => {
    skills.delete.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Skill deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error deleting skill",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  // Handler for deleting service
  const handleDeleteService = (id: string) => {
    services.delete.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Service deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error deleting service",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  // Handler for deleting category
  const handleDeleteCategory = (id: string) => {
    projectCategories.delete.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Category deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error deleting category",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  // Handler for deleting industry
  const handleDeleteIndustry = (id: string) => {
    industries.delete.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Industry deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error deleting industry",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <main className="w-full p-4">
      {/* ... existing JSX code remains the same ... */}
      <div className="flex justify-between items-center mb-6">
         <h1 className="font-semibold text-2xl">Product Lists</h1>
         <button className="font-semibold text-white bg-gradient-to-r from-primary to-secondary px-6 py-2 rounded-lg">
          Create +
        </button>
      </div>

      <CardContainer className="min-h-screen p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills List */}
          <ListDropDown
            name="Skill List"
            items={
              skillsQuery.data?.data.map((skill) => ({
                ...skill,
                name: skill.label,
              })) || []
            }
            buttonText="Add Skill"
            onAdd={() => skillDialogRef.current?.showModal()}
            onDelete={handleDeleteSkill} // Updated handler
          />

          {/* Services List */}
          <ListDropDown
            name="Company Services"
            items={
              servicesQuery.data?.data.map((service) => ({
                ...service,
                name: service.label,
              })) || []
            }
            buttonText="Add Service"
            onAdd={() => serviceDialogRef.current?.showModal()}
            onDelete={handleDeleteService} // Updated handler
          />

          {/* Project Categories */}
          <ListDropDown
            name="Project Category"
            items={
              categoriesQuery.data?.data.map((category) => ({
                ...category,
                name: category.label,
              })) || []
            }
            buttonText="Add Category"
            onAdd={() => categoryDialogRef.current?.showModal()}
            onDelete={handleDeleteCategory} // Updated handler
          />

          {/* Industries List */}
          <ListDropDown
            name="Industry List"
            items={
              industriesQuery.data?.data.map((industry) => ({
                ...industry,
                name: industry.label,
              })) || []
            }
            buttonText="Add Industry"
            onAdd={() => industryDialogRef.current?.showModal()}
            onDelete={handleDeleteIndustry} // Updated handler
          />
        </div>
      </CardContainer>

      {/* ... existing modal code remains the same ... */}
        {/* Modals for adding new items */}
//       {/* Add Skill Modal */}
//       <dialog ref={skillDialogRef} className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Add New Skill</h3>
//           <div className="py-4">
//             <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Skill name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => skillDialogRef.current?.close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleAddSkill}
              disabled={skills.add.isPending}
            >
              {skills.add.isPending ? "Adding..." : "Add Skill"}
            </button>
          </div>
        </div>
      </dialog>

      {/* Add Service Modal */}
      <dialog ref={serviceDialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Service</h3>
          <div className="py-4">
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              placeholder="Service name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => serviceDialogRef.current?.close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleAddService}
              disabled={services.add.isPending}
            >
              {services.add.isPending ? "Adding..." : "Add Service"}
            </button>
          </div>
        </div>
      </dialog>

      {/* Add Category Modal */}
      <dialog ref={categoryDialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Project Category</h3>
          <div className="py-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => categoryDialogRef.current?.close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleAddCategory}
              disabled={projectCategories.add.isPending}
            >
              {projectCategories.add.isPending ? "Adding..." : "Add Category"}
            </button>
          </div>
        </div>
      </dialog>

      {/* Add Industry Modal */}
      <dialog ref={industryDialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Industry</h3>
          <div className="py-4">
            <input
              type="text"
              value={newIndustry}
              onChange={(e) => setNewIndustry(e.target.value)}
              placeholder="Industry name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => industryDialogRef.current?.close()}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleAddIndustry}
              disabled={industries.add.isPending}
            >
              {industries.add.isPending ? "Adding..." : "Add Industry"}
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default ProductLists;
