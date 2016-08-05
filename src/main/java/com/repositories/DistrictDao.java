package com.repositories;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.models.District;
@Repository
@Transactional
public class DistrictDao {
	// ------------------------
	  // PUBLIC METHODS
	  // ------------------------
	  
	  /**
	   * Save the district in the database.
	   */
	  public void create(District district) {
	    entityManager.persist(district);
	    return;
	  }
	  
	  /**
	   * Delete the district from the database.
	   */
	  public void delete(District district) {
	    if (entityManager.contains(district))
	      entityManager.remove(district);
	    else
	      entityManager.remove(entityManager.merge(district));
	    return;
	  }
	  
	  /**
	   * Return all the districts stored in the database.
	   */
	  @SuppressWarnings("unchecked")
	  public List<District> getAll() {
	    return entityManager.createQuery("from District").getResultList();
	  }
	  
	  /**
	   * Return the district having the passed email.
	   */
	  public District getByEmail(String email) {
	    return (District) entityManager.createQuery(
	        "from District where email = :email")
	        .setParameter("email", email)
	        .getSingleResult();
	  }

	  /**
	   * Return the district having the passed id.
	   */
	  public District getById(String id) {
	    return entityManager.find(District.class, id);
	  }

	  /**
	   * Update the passed district in the database.
	   */
	  public void update(District district) {
	    entityManager.merge(district);
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
