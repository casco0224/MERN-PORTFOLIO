import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageTimeline = () => {
  const navigateTo = useNavigate();
  const { timeline, loading, error, message } = useSelector(
    (state) => state.timeline
  );

  const dispatch = useDispatch();

  // Función para eliminar una línea de tiempo
  const handleTimelineDelete = (id) => {
    dispatch(deleteTimeline(id))
      .then(() => {
        toast.success("Línea de tiempo eliminada correctamente");
        dispatch(getAllTimeline()); // Vuelve a cargar la lista de timeline
      })
      .catch((error) => {
        toast.error(error.message || "Error al eliminar la línea de tiempo");
      });
  };

  // Mostrar mensajes de éxito o error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline()); // Vuelve a cargar la lista de timeline
    }
  }, [dispatch, error, message]);

  // Cargar la lista de timelines al montar el componente
  useEffect(() => {
    dispatch(getAllTimeline());
  }, [dispatch]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Tabs defaultValue="week">
          <TabsContent value="week">
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Manage Your Timeline</CardTitle>
                <Button className="w-fit" onClick={() => navigateTo("/")}>
                  Return to Dashboard
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Description
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        From
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        To
                      </TableHead>
                      <TableHead className="md:table-cell">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeline && timeline.length > 0 ? (
                      timeline.map((element) => {
                        return (
                          <TableRow className="bg-accent" key={element._id}>
                            <TableCell>
                              <div className="font-medium">{element.title}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {element.description}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {element.timeline?.from || "No date"}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {element.timeline?.to || "Present"}
                            </TableCell>
                            <TableCell className="flex flex-row items-center gap-3 h-24">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/view/timeline/${element._id}`}>
                                      <button
                                        className="border-green-600 border-2 rounded-full h-8 w-8 flex 
                                      justify-center items-center text-green-600  hover:text-slate-950 
                                      hover:bg-green-600"
                                      >
                                        <Eye className="h-5 w-5" />
                                      </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    View
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/update/timeline/${element._id}`}>
                                      <button className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400  hover:text-slate-950 hover:bg-yellow-400">
                                        <Pen className="h-5 w-5" />
                                      </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    Edit
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600"
                                      onClick={() =>
                                        handleTimelineDelete(element._id)
                                      }
                                    >
                                      <Trash2 className="h-5 w-5" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    Delete
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell className="text-2xl">
                          You have not added any timeline.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ManageTimeline;