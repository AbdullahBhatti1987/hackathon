import React from 'react'

function AddStaff() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [StaffDetails, setStaffDetails] = useState({
     
     
    });


  return (
    <div className="">
    <Heading1 text={"Human Resurces"} />
    

    <Modal isOpen={isModalOpen} onRequestClose={resetForm} className={"modalStyle z-50"}>
 
 
      <ModalHeading text={editingIndex ? "Edit Class" : "Add Class"} />
      <form
        onSubmit={(e) => {
          editingIndex !== null ? handleUpdateClass() : handleAddClass();
        }}
      >
        <InputWithLabel
          label="Class Name"
          id="class-name"
          name="classTitle"
          value={classDetails.classTitle}
          onChange={handleInputChange}
          placeholder={"Enter Class Name"}
        />

        <SelectWithLabel
          label="Class Type"
          id="class-type"
          name="classType"
          value={classDetails.classType}
          onChange={handleInputChange}
          options={[
            { id: 1, value: "Auditorium", name: "Auditorium" },
            { id: 2, value: "Computer_Lab", name: "Computer_Lab" },
          ]}
          placeholder={"Select Class Type"}
        />

        <InputWithLabel
          label="Capacity"
          id="class-capacity"
          name="capacity"
          type="number"
          value={classDetails.capacity}
          onChange={handleInputChange}
          placeholder={"Enter Capacity"}
        />

        <SelectWithLabel
          label="City"
          id="class-city"
          name="city"
          value={classDetails.city}
          onChange={handleInputChange}
          options={cities}
          placeholder={"Select City"}
        />

        <SelectWithLabel
          label="Select Campus"
          id="class-campus"
          name="campus"
          value={classDetails.campus}
          onChange={handleInputChange}
          options={campuses}
          placeholder={"Select Campus"}
        />

        <div className="flex justify-center items-center gap-3 w-full">
          <ButtonM
            type="submit"
            text={editingIndex !== null ? "Update Class" : "Add Class"}
            onClick={editingIndex !== null ? handleUpdateClass : handleAddClass}
            className={"w-1/2"}
          />
          <ButtonM text={"Cancel"} onClick={() => setIsModalOpen(false)} className={"w-1/2"} />
        </div>
      </form>
    </Modal>

  
  </div>
  )
}

export default AddStaff;

