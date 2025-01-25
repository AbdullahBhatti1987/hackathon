import { useTheme } from "@mui/material/styles";
// import DashboardIcon from "@mui/icons-material/Dashboard";

// import Grid from "@mui/material/Grid2";
// import Paper from "@mui/material/Paper";

// import Button from "@mui/material/Button";
// import PrintIcon from "@mui/icons-material/Print";
// import DownloadIcon from "@mui/icons-material/Download";
// ===========================Others=======================



const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1920,
      xl: 2340,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background-color: #f1f1f1;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #D3D3D3; /* Blue color for the thumb */
        border-radius: 10px;
      }
      scrollbar-width: thin; /* For Firefox */
      scrollbar-color: #D3D3D3 #f1f1f1; /* For Firefox */
    `,
    },
  },
});



const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

function DemoPageContent({ pathname, navigate }) {
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
    
      try {
        if (pathname.startsWith("/users") && users.length === 0) {
          const usersResponse = await axios.get(AppRoutes.getAllUsers);
          setUsers(usersResponse.data?.data?.users);
          const totalUsers = usersResponse.data?.data?.totalUsers;
          setTotalCount((prevTotalCount) => ({
            ...prevTotalCount,
            users: totalUsers,
          }));
          console.log("totalCount=>", totalCount);
        }
        if (pathname.startsWith("/course") && courses.length === 0) {
          const courseResponse = await axios.get(AppRoutes.getAllCourses);
          setCourses(courseResponse.data?.data);
        }
        if (pathname.startsWith("/city") && cities.length === 0) {
          const citiesResponse = await axios.get(AppRoutes.getAllCities);
          setCities(citiesResponse.data?.data);
        }
        if (pathname.startsWith("/campus") && campuses.length === 0) {
          const campusResponse = await axios.get(AppRoutes.getAllCampuses);
        
          setCampuses(campusResponse.data?.data?.campuses);
        }
        if (pathname.startsWith("/hr")) {
          // const campusResponse = await axios.get(AppRoutes.getAllCampuses);
          // setCampuses(campusResponse.data?.data);
        }
        if (pathname.startsWith("/class") && classes.length === 0) {
          const classResponse = await axios.get(AppRoutes.getAllClasses);
          setClasses(classResponse.data?.data);
        }
        if (pathname.startsWith("/batch") && batches.length === 0) {
          const batchResponse = await axios.get(AppRoutes.getAllBatches);
          setBatches(batchResponse.data?.data);
        }
        if (pathname.startsWith("/section") && sections.length === 0) {
          const sectionResponse = await axios.get(AppRoutes.getAllSections);
          setSections(sectionResponse.data?.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pathname, cities, campuses, batches, courses, sections, classes, users]);

  const isDashboardPage = pathname.startsWith("/dashboard");
  const isHrPage = pathname.startsWith("/hr");
  const isUserPage = pathname.startsWith("/users");
  const isCityPage = pathname.startsWith("/city");
  const isCampusPage = pathname.startsWith("/campus");
  const isBatchPage = pathname.startsWith("/batch");
  const isCoursePage = pathname.startsWith("/course");
  const isSectionPage = pathname.startsWith("/section");
  const isClassesPage = pathname.startsWith("/class");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className="w-full">
        {loading ? (
          <div className="Loader"></div>
        ) : (
          <>
            {isDashboardPage && <Admin />}
            {isHrPage && <HumanResourse />}
            {isUserPage && <User users={users} setUsers={setUsers} />}
            {/* {isCityPage && <CityTable cities={cities} setCities={setCities} />} */}
            {isCityPage && <City cities={cities} setCities={setCities} />}
            {isCampusPage && <Campus campuses={campuses} setCampuses={setCampuses} />}
            {isBatchPage && <Batch batches={batches} setBatches={setBatches} cities={cities} courses={courses} />}
            {isCoursePage && <Course courses={courses} setCourses={setCourses} />}
            {isClassesPage && <Class classes={classes} setClasses={setClasses} cities={cities} campuses={campuses} />}
            {isSectionPage && (
              <Section
                sections={sections}
                setSections={setSections}
                courses={courses}
                campuses={campuses}
                cities={cities}
                classes={classes}
                batches={batches}
                // trainers={trainers}
              />
            )}
          </>
        )}
      </div>
    </Box>
  );
}

DemoPageContent.propTypes = {
  navigate: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};
function DashboardLayoutPattern(props) {
  const { window } = props;
  const router = useDemoRouter(props);
  const theme = useTheme();
  const demoWindow = window ? window() : undefined;

  const [currentUser, setCurrentUser] = useState("");
  const [session, setSession] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const decodeToken = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.error("Token not found");
          navigate("/");
          return;
        }
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);
        navigate("/");
        
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    decodeToken();
  }, [navigate]);

  const navigation = () => {
    if (!currentUser) return [];
    const baseStyle = { color: "#ffffff", backgroundColor: "#1976d2" }; // Customize colors
    if (currentUser.role === "admin") {
      return admin.map((item) => ({ ...item, sx: baseStyle }));
    }
    if (currentUser.role === "trainer") {
      return trainer.map((item) => ({ ...item, sx: baseStyle }));
    }
    return student.map((item) => ({ ...item, sx: baseStyle }));
  };

  function ToolbarActionsSearch() {
    return (
      <Stack direction="row">
        <Tooltip title="Search" enterDelay={1000}>
          <div>
            <IconButton
              type="button"
              aria-label="search"
              sx={{
                display: { xs: "inline", md: "none" },
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Tooltip>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <IconButton type="button" aria-label="search" size="small">
                  <SearchIcon />
                </IconButton>
              ),
              sx: { pr: 0.5 },
            },
          }}
          sx={{ display: { xs: "none", md: "inline-block" }, mr: 1 }}
        />
        <ThemeSwitcher />
      </Stack>
    );
  }

  const authentication = React.useMemo(() => {
    return {
      // signIn: () => {
      //   setSession({
      //     user: {
      //       name: currentUser?.fullName || "Guest",
      //       email: currentUser?.email || "",
      //       image: currentUser?.imageUrl || "",
      //     },
      //   });
      // },
      signOut: () => {
        Cookies.remove("token");
        setSession(null);
        console.log("User has been logged out.");
        navigate("/");
      },
    };
  }, []);

  const [logo, setLogo] = useState({
    logo: <img src="https://student.saylaniwelfare.com/assets/logo-OpazD70S.png" alt="SMIT logo" />,
    title: currentUser?.fullName,
    homeUrl: "",
  });

  useEffect(() => {
    setLogo({
      logo: <img src="https://student.saylaniwelfare.com/assets/logo-OpazD70S.png" alt="SMIT logo" />,
      title: currentUser?.fullName || "Guest",
      homeUrl: "",
    });
  }, [currentUser]);
  // export default function PageContainerBasic(props) {
  //   const { window } = props;
  // const router = useDemoRouter('/orders');
  // const router = useDemoRouter("/dashboard");

  return (
    <AppProvider
      session={{
        user: {
          name: currentUser?.fullName || "Guest",
          email: currentUser?.email || "",
          image: currentUser?.imageUrl || "",
        },
      }}
      authentication={authentication}
      navigation={navigation()}
      router={router}
      theme={demoTheme}
      window={window}
      branding={logo}
    >
      <DashboardLayout
        slots={{
          toolbarActions: ToolbarActionsSearch,
        }}
        sx={{ padding: "10px" }}
      >
        <DemoPageContent pathname={router.pathname} navigate={router.navigate} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutPattern.propTypes = {
  window: PropTypes.func,
  currentUser: PropTypes.object,
};

export default DashboardLayoutPattern;
