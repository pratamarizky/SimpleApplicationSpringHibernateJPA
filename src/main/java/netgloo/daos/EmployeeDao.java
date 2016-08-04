package netgloo.daos;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import netgloo.models.Employee;

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

	  // ------------------------
	  // PRIVATE FIELDS
	  // ------------------------
	  
	  // An EntityManager will be automatically injected from entityManagerFactory
	  // setup on DatabaseConfig class.
	  @PersistenceContext
	  private EntityManager entityManager;
}
