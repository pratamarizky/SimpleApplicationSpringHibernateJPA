package com.simpleapp.repositories;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.simpleapp.models.Employee;

@Repository
@Transactional
public class EmployeeDao {
	// ------------------------
	  // PUBLIC METHODS
	  // ------------------------
	  
	  /**
	   * Save the employee in the database.
	   */
	  public void create(Employee employee) {
	    entityManager.persist(employee);
	    return;
	  }
	  
	  /**
	   * Delete the employee from the database.
	   */
	  public void delete(Employee employee) {
	    if (entityManager.contains(employee))
	      entityManager.remove(employee);
	    else
	      entityManager.remove(entityManager.merge(employee));
	    return;
	  }
	  
	  /**
	   * Return all the employees stored in the database.
	   */
	  @SuppressWarnings("unchecked")
	  public List<Employee> getAll() {
	    return entityManager.createQuery("from Employee").getResultList();
	  }
	  
	  /**
	   * Return the employee having the passed email.
	   */
	  public Employee getByEmail(String email) {
	    return (Employee) entityManager.createQuery(
	        "from Employee where email = :email")
	        .setParameter("email", email)
	        .getSingleResult();
	  }

	  /**
	   * Return the employee having the passed id.
	   */
	  public Employee getById(String id) {
	    return entityManager.find(Employee.class, id);
	  }

	  /**
	   * Update the passed employee in the database.
	   */
	  public void update(Employee employee) {
	    entityManager.merge(employee);
	    return;
	  }

	  public String generateCode(){
		  String result;
		  Employee emp = (Employee) entityManager.createQuery(
			        "from Employee order by Employee_Code desc")
			        .getResultList().get(0);
		  System.out.println(emp.getEmployeeCode());
		  if(emp!=null){
			  result = emp.getEmployeeCode().substring(0, 10);
			  int last = Integer.parseInt(emp.getEmployeeCode().substring(11, 13));
			  System.out.println("data: "+emp.getEmployeeCode().substring(10, 13)+" last : "+last);
			  return result+String.format("%03d", last+1);
		  }
		  return "EMP0131524001";
	  }
	  
	  public List<Employee> filter(String filter){
		  return entityManager.createQuery("FROM Employee WHERE employee_name = :filter or employee_address = :filter")
				  .setParameter("filter", filter).getResultList();
	  }
	  // ------------------------
	  // PRIVATE FIELDS
	  // ------------------------
	  
	  // An EntityManager will be automatically injected from entityManagerFactory
	  // setup on DatabaseConfig class.
	  @PersistenceContext
	  private EntityManager entityManager;
}
