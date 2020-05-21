using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Moq;
using System;
using Xunit;
using WebApp.Models;
using WebApp.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Configuration;

namespace WebApp.Tests
{
    public class DrugControllerTests
    {
        [Fact]
        public void IndexReturnsListOfDrugsTest()
        {
            // Arrange
            var mock = new Mock<IRepository>();
            mock.Setup(repo => repo.GetAll()).Returns(GetDrugs());
            var controller = new DrugController(mock.Object);
            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Drug>>(viewResult.Model);
            Assert.Equal(GetDrugs().Count, model.Count());
        }
        private List<Drug> GetDrugs()
        {
            var drugs = new List<Drug>
            {
                new Drug { Id=1, Name="Febwrv", Formula="H2O", Cost=123},
                new Drug { Id=2, Name="Ereer", Formula="E3R43", Cost=3},
                new Drug { Id=3, Name="Egerver", Formula="H342O", Cost=12},
            };
            return drugs;
        }

        [Fact]
        public void AddDrugReturnsViewResultWithDrugModel()
        {
            // Arrange
            var mock = new Mock<IRepository>();
            var controller = new DrugController(mock.Object);
            controller.ModelState.AddModelError("Name", "Required");
            Drug drug = new Drug();

            // Act
            var result = controller.AddDrug(drug);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Equal(drug, viewResult?.Model);
        }
        [Fact]
        public void GetDrugReturnsBadRequestResultWhenIdIsNull()
        {
            // Arrange
            var mock = new Mock<IRepository>();
            var controller = new DrugController(mock.Object);

            // Act
            var result = controller.GetDrug(null);

            // Arrange
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void GetDrugReturnsNotFoundResultWhenDrugNotFound()
        {
            int testId = 1;
            var mock = new Mock<IRepository>();
            mock.Setup(repo => repo.Get(testId))
                .Returns(null as Drug);
            var controller = new DrugController(mock.Object);

            var result = controller.GetDrug(testId);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void GetDrugReturnsViewResultWithDrug()
        {
            // Arrange
            int testId = 1;
            var mock = new Mock<IRepository>();
            mock.Setup(repo => repo.Get(testId))
                .Returns(GetDrugs().FirstOrDefault(p => p.Id == testId));
            var controller = new DrugController(mock.Object);

            // Act
            var result = controller.GetDrug(testId);

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var model = Assert.IsType<Drug>(viewResult.ViewData.Model);
            Assert.Equal(testId, model.Id);
            Assert.Equal("Febwrv", model.Name);
            Assert.Equal("H2O", model.Formula);
            Assert.Equal(123, model.Cost);
        }
    }
}
