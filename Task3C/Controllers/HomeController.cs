using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Task3C.Models;

namespace Task3C.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        var days = new List<string> { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" };

        var workers = new List<WorkerSchedule>
        {
            new() {
                Id = 1, Name = "Alice Johnson", Role = "Shift Supervisor", Department = "Operations",
                AvatarColor = "#6366f1",
                WeeklyShifts = new() { ["Mon"]="morning", ["Tue"]="morning", ["Wed"]="morning",
                                       ["Thu"]="morning", ["Fri"]="morning", ["Sat"]="off", ["Sun"]="off" }
            },
            new() {
                Id = 2, Name = "Bob Carter", Role = "Stock Associate", Department = "Warehouse",
                AvatarColor = "#f59e0b",
                WeeklyShifts = new() { ["Mon"]="afternoon", ["Tue"]="afternoon", ["Wed"]="off",
                                       ["Thu"]="afternoon", ["Fri"]="afternoon", ["Sat"]="morning", ["Sun"]="off" }
            },
            new() {
                Id = 3, Name = "Clara Nguyen", Role = "Customer Service", Department = "Front Desk",
                AvatarColor = "#10b981",
                WeeklyShifts = new() { ["Mon"]="morning", ["Tue"]="off", ["Wed"]="morning",
                                       ["Thu"]="afternoon", ["Fri"]="afternoon", ["Sat"]="morning", ["Sun"]="morning" }
            },
            new() {
                Id = 4, Name = "David Kim", Role = "Night Guard", Department = "Security",
                AvatarColor = "#ef4444",
                WeeklyShifts = new() { ["Mon"]="night", ["Tue"]="night", ["Wed"]="night",
                                       ["Thu"]="off", ["Fri"]="night", ["Sat"]="night", ["Sun"]="night" }
            },
            new() {
                Id = 5, Name = "Emma Williams", Role = "Cashier", Department = "Sales",
                AvatarColor = "#8b5cf6",
                WeeklyShifts = new() { ["Mon"]="afternoon", ["Tue"]="morning", ["Wed"]="afternoon",
                                       ["Thu"]="morning", ["Fri"]="off", ["Sat"]="afternoon", ["Sun"]="afternoon" }
            },
            new() {
                Id = 6, Name = "Frank Torres", Role = "Logistics Lead", Department = "Warehouse",
                AvatarColor = "#0ea5e9",
                WeeklyShifts = new() { ["Mon"]="morning", ["Tue"]="morning", ["Wed"]="afternoon",
                                       ["Thu"]="afternoon", ["Fri"]="morning", ["Sat"]="off", ["Sun"]="off" }
            },
            new() {
                Id = 7, Name = "Grace Lee", Role = "HR Coordinator", Department = "Human Resources",
                AvatarColor = "#ec4899",
                WeeklyShifts = new() { ["Mon"]="morning", ["Tue"]="morning", ["Wed"]="morning",
                                       ["Thu"]="morning", ["Fri"]="morning", ["Sat"]="off", ["Sun"]="off" }
            },
            new() {
                Id = 8, Name = "Henry Brown", Role = "Maintenance Tech", Department = "Facilities",
                AvatarColor = "#f97316",
                WeeklyShifts = new() { ["Mon"]="night", ["Tue"]="off", ["Wed"]="night",
                                       ["Thu"]="night", ["Fri"]="off", ["Sat"]="morning", ["Sun"]="morning" }
            },
        };

        var model = new ScheduleViewModel
        {
            WeekLabel = "Week of 2 – 8 March 2026",
            Days = days,
            Workers = workers
        };

        return View(model);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
